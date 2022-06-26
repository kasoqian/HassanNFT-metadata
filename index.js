const { nftTotal, basePath, nftImageMax } = require("./config");
const fs = require("fs");

// metadata 基础结构
let metadataSource = {
  name: "Hassan",
  description:
    "Hassan Calloway is heir to Calloway Arms, one of the world's leading mil-tech suppliers. Ingenious and determined, Hassan has been searching for his missing father, and for SHRAP, since Earthfall.",
  image:
    "https://raw.githubusercontent.com/CheersPals/cheerspalsofficial/main/images/0001.png",
  attributes: [
    { trait_type: "health", value: 0 },
    { trait_type: "power", value: 0 },
    { trait_type: "magic", value: 0 },
    { trait_type: "exp", value: 0 },
    { trait_type: "lv", value: 0 },
  ],
};

(async function () {
  const rarity = { N: 0, R: 0, S: 0, SR: 0, SSR: 0 };

  for (let i = 1; i <= nftTotal; i++) {
    metadataSource.name = `Hassan #${i}`;
    metadataSource.image = `${basePath}/${randomNum(1, nftImageMax)}.png`;
    metadataSource.attributes[0].value = randomNum(1, 100);
    metadataSource.attributes[1].value = randomNum(1, 100);
    metadataSource.attributes[2].value = randomNum(1, 100);
    metadataSource.attributes[3].value =
      metadataSource.attributes[0].value +
      metadataSource.attributes[1].value +
      metadataSource.attributes[2].value;
    metadataSource.attributes[4].value = getLvByExp(
      metadataSource.attributes[3].value,
    );

    metadataSource.attributes.map(item => {
      item.value = item.value.toString();
      return item;
    });

    rarity[metadataSource.attributes[4].value] =
      rarity[metadataSource.attributes[4].value] + 1;

    const resultJson = JSON.stringify(metadataSource);
    await writeFile(i, resultJson);
  }

  console.log(rarity);
})();

function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

function getLvByExp(x) {
  let z = (x + 1) / 2;
  y = x;
  while (z < y) {
    y = z;
    z = (x / z + z) / 2;
  }
  const result = parseInt(y);
  if (result > 15) return "SSR";
  if (result > 13) return "SR";
  if (result > 10) return "S";
  if (result > 8) return "R";
  return "N";
}

function writeFile(tokenid, metadata) {
  return new Promise((res, rej) => {
    fs.writeFile(`./metadata/json/${tokenid}.json`, metadata, err => {
      if (!err) {
        console.log(`#${tokenid}编号 NFT的metadata创建成功！`);
        res();
      }
    });
  });
}
