const got = require("got");
const cheerio = require("cheerio");

async function test() {
  try {
    // # 1. Make a GET request
    const resp = await got("https://kith.com/collections/kith", {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
      },
    });

    // # 2. load our html into cheerio
    const $ = cheerio.load(resp.body);
    // const title = $("title").text().replace(/\s+/g, "");
    // const title = $("meta[property='og:title']").attr("content");
    // console.log(title);

    const arr = [];

    $("li.collection-product").each(function () {
      const title = $(this).find(".product-card__title").text();
      const style = $(this).find(".product-card__color").text();
      const price = $(this)
        .find(".product-card__price")
        .text()
        .replace(/\s+/g, "");

      arr.push({
        title,
        style,
        price,
      });
    });

    console.log(arr);
  } catch (e) {
    if (e) {
      console.log(e);
    }
  }
}

test();
