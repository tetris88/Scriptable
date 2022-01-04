// Variables used by Scriptable.k
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: magic;
/* --------------------------------------------------------------
Script: MetaMask Ethereum Balance.js
Author: Tetris88
Version: 1.0.0
Description:
Displays the current MetaMask balance Ethereum price.
Changelog:
1.0.0: INIT
-------------------------------------------------------------- */
////////////////////////////////////////////////////////////////////
///////////////////// CHANGE TO YOUR ETH ADDRESS ///////////////////
const address = 'ETH_ADDRESS' 

// Set the "When Interacting, Open URL" to https://explorer.helium.com/accounts/YOURWALLETADDRESS
////////////////////////////////////////////////////////////////////

/// CONFIG

const ethFactor = 1000000000000000000;

const reqclean = new Request('https://api.covalenthq.com/v1/1/address/' + address + '/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_docs')
const resclean = await reqclean.loadJSON()
const balance = (resclean.data.items[0].balance)
var ethBalance = balance / ethFactor


const coingeckoreq = new Request('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD')
const coingeckores = await coingeckoreq.loadJSON()
const coingeckousd = (coingeckores.ethereum.usd).toFixed(2);
const ethprice = coingeckousd
var usdbalance = ethBalance*coingeckousd


const metamasklogo = new Request('https://en.bitcoinwiki.org/upload/en/images/e/eb/Metamask.png')
const img = await metamasklogo.loadImage()


// SCRIPT
let widget = createWidget(img, ethBalance, ethprice)
if (config.runsInWidget) {
  Script.setWidget(widget)
  Script.complete()
}
else {
  widget.presentSmall()
}

// Widget layout 
function createWidget(img, ethBalance, ethprice)
 {
  let w = new ListWidget()
  w.backgroundColor = Color.black()
  
  w.addSpacer(8)

// Uncomment the next 3 lines to use a logo

  let image = w.addImage(img)
  image.imageSize = new Size(150, 60)
  image.centerAlignImage()

// Uncomment the next 4 lines if not using a logo

//  let titleTxt = w.addText("MetaMask Balance")
//  titleTxt.textColor = new Color('#474DFF')
//  titleTxt.font = Font.boldSystemFont(16)
//  titleTxt.centerAlignText()


  w.addSpacer(4)
  
  let WalletText = w.addText("Ethereum Balance:")
  WalletText.textColor = Color.white()
  WalletText.font = Font.boldSystemFont(14)
  WalletText.centerAlignText()
  
 
  let EthbalanceTxt = w.addText('' + (ethBalance).toFixed(6))
  EthbalanceTxt.textColor = Color.gray()
  EthbalanceTxt.font = Font.systemFont(18)
  EthbalanceTxt.centerAlignText()
  
  w.addSpacer(2)
    
  let usdUnpaidTxt = w.addText("$" + (usdbalance).toFixed(2))
  usdUnpaidTxt.textColor =  Color.green()
  usdUnpaidTxt.font = Font.systemFont(12)
  usdUnpaidTxt.centerAlignText()
  
  w.addSpacer(4)
  
  let staticTitle1Text = w.addText("Ethereum Price:")
  staticTitle1Text.textColor = Color.white()
  staticTitle1Text.font = Font.boldSystemFont(14)
  staticTitle1Text.centerAlignText()
  
 
  let balanceHNTTxt = w.addText('$' + ethprice)
  balanceHNTTxt.textColor = Color.gray()
  balanceHNTTxt.font = Font.systemFont(18)
  balanceHNTTxt.centerAlignText()


  w.addSpacer(8)
  w.setPadding(0, 0, 0, 0)
  return w
}
