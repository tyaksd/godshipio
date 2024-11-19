const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000; // ポート番号を4000に設定

// ミドルウェアの設定
app.use(cors());
app.use(bodyParser.json());

// 保存先ファイルのパスを指定
const filePath = path.join(__dirname, 'emails.txt');

// メールアドレスを受け取るエンドポイント
app.post('/signup', (req, res) => {
    const { email } = req.body;

    if (email) {
        const emailEntry = `${email}\n`;

        // メールアドレスをテキストファイルに保存
        fs.appendFile(filePath, emailEntry, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).send('Error saving email');
            }
            console.log(`Received and saved email: ${email}`);
            res.status(200).send('Email received and saved');
        });
    } else {
        res.status(400).send('Invalid request: No email provided');
    }
});

// 保存されたメールアドレスを取得するエンドポイント
app.get('/emails', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading emails');
        }

        // ファイルの内容を配列に分割し、JSON形式で返す
        const emails = data.split('\n').filter(email => email.trim() !== '');
        res.status(200).json({ emails });
    });
});

// サーバーを起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});