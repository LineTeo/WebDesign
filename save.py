#!/usr/local/bin/python3
import cgi
import csv
import sys

# 日本語処理のための設定
sys.stdout.reconfigure(encoding='utf-8')

# フォームデータの受け取り
form = cgi.FieldStorage()
name = form.getvalue('username', '')
emailadress = form.getvalue('email', '')
message = form.getvalue('message', '')

# CSVファイルへの追記 (Excel対応のためUTF-8 with BOM)
if name or message:
    with open('data.csv', 'a', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f)
        writer.writerow([name, emailadress,message])

# ブラウザへのレスポンス
print("Content-Type: text/html; charset=utf-8\n")
print("<html><body>")
print("<h1>保存完了</h1>")
print("<p><a href='index.html'>戻る</a></p>")
print("</body></html>")
