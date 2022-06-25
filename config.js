const nftTotal = 10000;
// github账户地址/仓库地址/分支地址(通常为main)/图片所在路径
const githubAccounts = "kasoqian";
const githubRepositories = "HassanNFT";
const githubBranch = "main";
const imagesPath = "metadata/images";

const nftImageMax = 6;

const basePath = `https://raw.githubusercontent.com/${githubAccounts}/${githubRepositories}/${githubBranch}/${imagesPath}`;

module.exports = { nftTotal, basePath, nftImageMax };
