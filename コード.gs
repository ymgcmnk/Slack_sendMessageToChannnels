// Bot User OAuth Token（Bot）だと各チャンネルにBotが入っていないと通知ができないので、User OAuth Tokenを使う。
// トークンはプロパティに格納。
//https://zenn.dev/shikumiya_hata/books/33f44d4f561ec4/viewer/bf2772
//https://api.slack.com/methods/chat.postMessage


function sendMessageToChannnels() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('シート1');
  const range = sheet.getRange("A:A");
  const values = range.getValues();
  values.shift(); //先頭行の値削除

  const valuesLength = values.length;

  for (let i = 0; i < valuesLength; i++) {
    const channelID = values[i].toString();

    console.log(channelID);
    console.log(typeof channelID);
    postChatMessage(channelID);

  }
  console.log("処理終了")
}


function postChatMessage(channelID) {

  console.log(channelID);

  const token = PropertiesService.getScriptProperties().getProperty('USER_OAUTH_TOKEN');

  const headers = {
    'Content-Type': 'application/json', // JSON形式でレスポンスを受け取る
    'Authorization': 'Bearer ' + token
  }
  // リクエストパラメータを作成
  const payload = {
    'channel': channelID,
    'text':
    `
    平素より大変お世話になっております。
    株式会社XXXXXX と申します。

    弊社Slackワークスペースの環境整備の一環として、
    下記の通り一部チャンネルのアーカイブを実施予定です。
    本チャンネルはアーカイブの対象となっているため、このメッセージを通知しております。
    ご理解、ご協力のほど、何卒よろしくお願い申し上げます。
    

    
    Slack チャンネルアーカイブ　実施のお知らせ

    　　　　　　　　　　　記

    アーカイブ対象：
    このメッセージが配信されているチャンネル。

    アーカイブする事由；
    XXXXXX であるため、アーカイブを実施いたします。


    一斉アーカイブ実施日時：
    アーカイブの実施は2022/00/00（X）午後00時頃を予定しています。
    なお、このチャンネル内のメンバ間で合意が得られている場合には、
    この通知を受け取られた方が、一斉アーカイブの実施前に、
    自主的にアーカイブすることは差し支えございません。


    本件連絡先：
    アーカイブに支障がある場合は、チャンネル名とアーカイブしない事由を添えて、
    2022/00/00（X）午後00時までに
    XXXXXX宛にメンションにてお知らせください。


    参考情報：
    Slackアーカイブについて
    https://slack.com/intl/ja-jp/help/articles/213185307-%E3%83%81%E3%83%A3%E3%83%B3%E3%83%8D%E3%83%AB%E3%82%92%E3%82%A2%E3%83%BC%E3%82%AB%E3%82%A4%E3%83%96%E3%81%BE%E3%81%9F%E3%81%AF%E5%89%8A%E9%99%A4%E3%81%99%E3%82%8B
    ※アーカイブ後も検索は可能です。

    以上
    `


  }
  const params = {
    'method': 'POST', // POSTメソッドでリクエストする
    'headers': headers,
    'payload': JSON.stringify(payload)
  }

  const response = UrlFetchApp.fetch('https://slack.com/api/chat.postMessage', params)
}
