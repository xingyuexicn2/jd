// version v0.0.2
// create by ruicky
// detail url: https://github.com/ruicky/jd_sign_bot

const exec = require('child_process').execSync;
const fs = require('fs');
const rp = require('request-promise');
const download = require('download');

// 公共变量
const KEY = 'b_webp=1; b_avif=1; shshshfpa=19e5bde3-843e-4f1b-229e-d3fcded4e1b8-1727098633; shshshfpx=19e5bde3-843e-4f1b-229e-d3fcded4e1b8-1727098633; jcap_dvzw_fp=C04XQe_Au-TzSEo1w0ZaUWJI193G5utJU-c7Cfu3tnBXzqDLKPC2Ea3Bg1UG_35R3pEEM5MbmDs821s7pE8HxQ==; whwswswws=; __jdu=17270986329221434933170; TrackID=1sLCNtzLl0elAmZV8PNjFdqgD4VBPqWp5yxkJVaoSD6yeGAYTVE4YFxh8uL83g8YD9yVtyngJP4jLJvjLosFC8-Xy0PHWpuGEwECZ1bLSuSJHisBIRq0DTTlFqkI-R0_v; thor=721002897701FA1EC591574A7650B5652CE364B95DC136E23D35182EFAA9EED5BEA77563119F6DD78EC2F7594C350490F3CFFB4494F3B6EA8B6EB7AF931762B43A81E5575D2C9A2418328E4AC77BF84D9E3091AB925B8CD9513F6CC6526CDCD1DB2653FAD8A055819DD76B6DD3CCA6D994851DF1E5EE34A76A6DA5A9656FE7D3AF47C4F30C13C61A173C20E1E7A687BE1127580CE2D236D7F75C61BFD0C85BB6; light_key=AASBKE7rOxgWQziEhC_QY6ya-Ui7SNtS9vewqn7kqy2KR5xSoZNt_sg1gr8tbrsmNUDjiMft; pinId=0W4l5fHHwvEZaPBZm58n1Q; pin=jd_rIhBxhDVpmKL; unick=jd_t151u64phwmd9t; 3AB9D23F7A4B3C9B=IHHXYJ5RAU7SJM7KT3ENKWTTMUQAB4CIZUVRC342H3LLRTZE2MOGY6WGMYJDITPWHUOM73SAOPYSKSLOVFTOET5USQ; autoOpenApp_downCloseDate_jd_independent_coupon_openapp=1730724290121_1; autoOpenApp_downCloseDate_autoOpenApp_autoPromptly=1730724504479_1; areaId=10; ipLoc-djd=10-742-0-0; PCSYCityID=CN_230000_230600_0; umc_count=1; source=PC; platform=pc; __jdc=173673530; mobilev=html5; mba_muid=17270986329221434933170; 3AB9D23F7A4B3CSS=jdd03IHHXYJ5RAU7SJM7KT3ENKWTTMUQAB4CIZUVRC342H3LLRTZE2MOGY6WGMYJDITPWHUOM73SAOPYSKSLOVFTOET5USQAAAAMTUZEFL6AAAAAAC6IXEOSRAHGX3IX; _gia_d=1; flash=3_Dwyz8cPrFl2pwAxvW-7ks4AeX_7EsnMNNj9WpDN7EDwhtmksZ3jf1faMFku9G1p918sizoX_KogiypPwc5qbbViwTv_FN7hYPMFkJPoBPlg2-JBNx-kZIey0uHIB9DP5nuEC8l7c-ElbojbvQDDQVEZmBHH6imw6o7JKXiJFCkIVttSWO-ii; autoOpenApp_downCloseDate_auto=1733661580317_1800000; unpl=JF8EAJ1nNSttDxhTDRIFThRFQw5cWwhcTkQHbjRSVA5ZHgcETlBJF0J7XlVdWBRLFB9ubhRXXFNJXA4eAysSEHteVV1fAUwXB21kNWRdWUpXBhMHGhMYe15Ublw4SxEAaWYNXVpaSFwGGAIeEBVDX1ZeWwl7FjNvbwJkbWhKZAQrAytZfkoQVFheDkofCmhlBlxeW0tRBx4KGRAQTVxkX20L; __jda=173673530.17270986329221434933170.1727098632.1733661158.1733661582.19; b_dpr=2.0000000596046448; b_dw=375; b_dh=667; __jdb=173673530.3.17270986329221434933170|19.1733661582; __jdv=173673530%7Clianmeng__10__api.shop.xuelg.com%7Ct_2023861532_%7Cjingfen%7Cfb6986d7d9b94de4b50bf1b0db0dcc4c%7C1733661588233; mba_sid=17336615770197858014423371602.8; shshshfpb=BApXSf-1ApfZAExPzdnmhr5BXuotlElBiBmVIgRwb9xJ1MrZU7IC2; yodaId=%E2%82%A025db33ca3df7f6f2571e0cfaf2e7eeeb%E2%82%A0; __jd_ref_cls=MDownLoadFloat_click';
//process.env.JD_COOKIE
const serverJ = 'sctp3641ta-w1wpp1gmoyutk6nh7vhs50ho';
//process.env.PUSH_KEY
const DualKey = process.env.JD_COOKIE_2;



async function downFile () {
    // const url = 'https://cdn.jsdelivr.net/gh/NobyDa/Script@master/JD-DailyBonus/JD_DailyBonus.js'
    const url = 'https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js';
    await download(url, './');
}

async function changeFile () {
   let content = await fs.readFileSync('./JD_DailyBonus.js', 'utf8')
   content = content.replace(/var Key = ''/, `var Key = '${KEY}'`);
   if (DualKey) {
    content = content.replace(/var DualKey = ''/, `var DualKey = '${DualKey}'`);
   }
   await fs.writeFileSync( './JD_DailyBonus.js', content, 'utf8')
}

async function sendNotify (text,desp) {
  const options ={
    uri:  `https://sc.ftqq.com/${serverJ}.send`,
    form: { text, desp },
    json: true,
    method: 'POST'
  }
  await rp.post(options).then(res=>{
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  })
}

async function start() {
  if (!KEY) {
    console.log('请填写 key 后在继续')
    return
  }
  // 下载最新代码
  await downFile();
  console.log('下载代码完毕')
  // 替换变量
  await changeFile();
  console.log('替换变量完毕')
  // 执行
  await exec("node JD_DailyBonus.js >> result.txt");
  console.log('执行完毕')

  if (serverJ) {
    const path = "./result.txt";
    let content = "";
    if (fs.existsSync(path)) {
      content = fs.readFileSync(path, "utf8");
    }
    let t = content.match(/【签到概览】:((.|\n)*)【签到奖励】/)
    let res = t ? t[1].replace(/\n/,'') : '失败'
    let t2 = content.match(/【签到奖励】:((.|\n)*)【其他奖励】/)
    let res2 = t2 ? t2[1].replace(/\n/,'') : '总计0'

    
    await sendNotify("" + ` ${res2} ` + ` ${res} ` + new Date().toLocaleDateString(), content);
  }
}

start()
