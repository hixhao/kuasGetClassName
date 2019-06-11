var request = require('request');

var headers = {
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Origin': 'https://webap.nkust.edu.tw',
    'Upgrade-Insecure-Requests': '1',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Referer': 'https://webap.nkust.edu.tw/nkust/index_main.html',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6',
    'Cookie': 'SKIcpAfErC/P=v1EpyrBQ@@23S'
};


var data = {
    uid: '1106137118',
    pwd: '4948',
}

var options = {
    url: 'https://webap.nkust.edu.tw/nkust/perchk.jsp',
    method: 'POST',
    headers: headers,
    form: data
};
//登入校務系統
request(options, (error, response, body) => {

    if (!error && response.statusCode == 200) {
        //js判別字串和re pattern是否相符的方法
        //    pattern.test(str)
        if (/無此帳號或密碼不正確/.test(body)) {
            console.log("登入失敗，帳號密碼輸入不正確")
        } else {
            console.log("登入成功")
            //將headers response傳回的cookie丟進headers，下次request使用
            let cookie = response.headers["set-cookie"]
            headers.Cookie = cookie
            //設定要取得資料的url
            options.url = 'https://webap.nkust.edu.tw/nkust/f_head.jsp'
            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                    pattern = /<span>.+<\/span><br><span>(.+)<\/span><\/font><br><span>(.+)<\/span><br>/
                    console.log("re抓取後的結果:" + body.match(pattern)[0])
                    console.log("re做group抓取的班級:" + body.match(pattern)[1])
                    console.log("re做group抓取的姓名:" + body.match(pattern)[2])
                }
            });

        }
    }


});
