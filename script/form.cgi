#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import cgi
import cgitb
import os
from datetime import datetime

# デバッグモードを有効化（開発時のみ）
cgitb.enable()

# データを保存するファイルのパス
DATA_FILE = '/virtual/ymsksgr2002/log/contacts.txt'

def save_data(name, email, message):
    """フォームデータをファイルに保存"""
    try:
        # ディレクトリが存在しない場合は作成
        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        
        # タイムスタンプを取得
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        # データをファイルに追記
        with open(DATA_FILE, 'a', encoding='utf-8') as f:
            f.write('=' * 50 + '\n')
            f.write(f'送信日時: {timestamp}\n')
            f.write(f'名前: {name}\n')
            f.write(f'メールアドレス: {email}\n')
            f.write(f'メッセージ:\n{message}\n')
            f.write('=' * 50 + '\n\n')
        
        return True
    except Exception as e:
        print(f"<!-- エラー: {str(e)} -->")
        return False

def main():
    """メイン処理"""
    # HTTPヘッダーを出力
    print("Content-Type: text/html; charset=utf-8")
    print()
    
    # フォームデータを取得
    form = cgi.FieldStorage()
    
    # データの取得
    name = form.getvalue('name', '').strip()
    email = form.getvalue('email', '').strip()
    message = form.getvalue('message', '').strip()
    
    # HTMLの開始
    print('<!DOCTYPE html>')
    print('<html lang="ja">')
    print('<head>')
    print('    <meta charset="UTF-8">')
    print('    <meta name="viewport" content="width=device-width, initial-scale=1.0">')
    print('    <title>送信完了</title>')
    print('    <style>')
    print('        body {')
    print('            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;')
    print('            max-width: 600px;')
    print('            margin: 50px auto;')
    print('            padding: 20px;')
    print('            background-color: #f5f5f5;')
    print('        }')
    print('        .message-container {')
    print('            background: white;')
    print('            padding: 30px;')
    print('            border-radius: 8px;')
    print('            box-shadow: 0 2px 10px rgba(0,0,0,0.1);')
    print('            text-align: center;')
    print('        }')
    print('        .success {')
    print('            color: #4CAF50;')
    print('            font-size: 24px;')
    print('            margin-bottom: 20px;')
    print('        }')
    print('        .error {')
    print('            color: #f44336;')
    print('            font-size: 24px;')
    print('            margin-bottom: 20px;')
    print('        }')
    print('        .back-link {')
    print('            display: inline-block;')
    print('            margin-top: 20px;')
    print('            padding: 10px 20px;')
    print('            background-color: #2196F3;')
    print('            color: white;')
    print('            text-decoration: none;')
    print('            border-radius: 4px;')
    print('        }')
    print('        .back-link:hover {')
    print('            background-color: #0b7dda;')
    print('        }')
    print('        .data-display {')
    print('            text-align: left;')
    print('            margin: 20px 0;')
    print('            padding: 15px;')
    print('            background-color: #f9f9f9;')
    print('            border-left: 4px solid #4CAF50;')
    print('        }')
    print('    </style>')
    print('</head>')
    print('<body>')
    print('    <div class="message-container">')
    
    # バリデーション
    if not name or not email or not message:
        print('        <h1 class="error">エラー</h1>')
        print('        <p>すべての項目を入力してください。</p>')
        print('        <a href="javascript:history.back()" class="back-link">戻る</a>')
    else:
        # データを保存
        if save_data(name, email, message):
            print('        <h1 class="success">送信完了</h1>')
            print('        <p>お問い合わせありがとうございます。</p>')
            print('        <div class="data-display">')
            print(f'            <p><strong>お名前:</strong> {cgi.escape(name)}</p>')
            print(f'            <p><strong>メールアドレス:</strong> {cgi.escape(email)}</p>')
            print(f'            <p><strong>メッセージ:</strong><br>{cgi.escape(message).replace(chr(10), "<br>")}</p>')
            print('        </div>')
            print('        <a href="/" class="back-link">トップページへ戻る</a>')
        else:
            print('        <h1 class="error">エラー</h1>')
            print('        <p>データの保存に失敗しましたんす。</p>')
            print('        <a href="javascript:history.back()" class="back-link">戻る</a>')
    
    print('    </div>')
    print('</body>')
    print('</html>')

if __name__ == '__main__':
    main()
