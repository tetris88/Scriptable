    // Variables used by Scriptable.
    // These must be at the very top of the file. Do not edit.
    // icon-color: light-brown; icon-glyph: magic;
    /* --------------------------------------------------------------
    Script: Ethermine Workers.js
    Author: Trtris88
    Version: 1.0.0
    Description:
    Displays the current ethermine miner statistics.
    Changelog:
    1.0.0: INIT
    -------------------------------------------------------------- */
    ////////////////////////////////////////////////////////////////////
    ///////////////////// CHANGE TO YOUR ETH ADDRESS ///////////////////
    const address = 'EthAddress'
  
    const worker1 = 'w1'
    const worker2 = 'w2'
    const worker3 = 'w3'
    const worker4 = 'w4'
                
    ////////////////////////////////////////////////////////////////////
    
    /// CONFIG
    const WEI = 1000000000000000000
    const hashFactor = 1000000
const url = 'https://api.ethermine.org/miner/' + address + '/currentStats'
    const req = new Request(url)
    const res = await req.loadJSON()

    const curHash = res.data.currentHashrate / hashFactor;
    const activeWorkers = res.data.activeWorkers;

const url2 = 'https://api.ethermine.org/miner/' + address + '/worker/' + worker1 + '/currentStats'  
    const req2 = new Request(url2)
    const res2 = await req2.loadJSON()
    const W1curHash = res2.data.currentHashrate / hashFactor;

const url3 = 'https://api.ethermine.org/miner/' + address + '/worker/' + worker2 + '/currentStats'  
    const req3 = new Request(url3)
    const res3 = await req3.loadJSON()
    const W2curHash = res3.data.currentHashrate / hashFactor;

const url4 = 'https://api.ethermine.org/miner/' + address + '/worker/' + worker3 + '/currentStats'  
    const req4 = new Request(url4)
    const res4 = await req4.loadJSON()
    const W3curHash = res4.data.currentHashrate / hashFactor;

const url5 = 'https://api.ethermine.org/miner/' + address + '/worker/' + worker4 + '/currentStats'  
    const req5 = new Request(url5)
    const res5 = await req5.loadJSON()
    const W4curHash = res5.data.currentHashrate / hashFactor;
    
    
const ethlogo = new Request('https://cryptonaute.fr/wp-content/uploads/2020/10/logo-ethermine.png')
const img = await ethlogo.loadImage()
    
    
    const coingeckoreq = new Request('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD')
const coingeckores = await coingeckoreq.loadJSON()
const coingeckousd = (coingeckores.ethereum.usd).toFixed(2);

    
    // SCRIPT
    let widget = createWidget(curHash, activeWorkers, img, W1curHash, W2curHash, W3curHash, W4curHash)
    if (config.runsInWidget) {
      Script.setWidget(widget)
      Script.complete()
    }
    else {
      widget.presentSmall()
    }
    
    // Widget layout 
    function createWidget(curHash, activeWorkers, img, W1curHash, W2curHash, W3curHash, W4curHash)
  {
      let w = new ListWidget()
      w.backgroundColor = new Color("#1A1A1A")
    
      let image = w.addImage(img)
      image.imageSize = new Size(150, 50)
      image.centerAlignImage()
    
      
      w.addSpacer(6)   
    
      let staticText2 = w.addText("Current Hashrate:")
      staticText2.textColor = Color.white()
      staticText2.font = Font.boldSystemFont(16)
      staticText2.centerAlignText()
    
      w.addSpacer(2)
      
      let curHashTxt = w.addText(curHash.toFixed(2))
      curHashTxt.textColor = Color.blue()
      curHashTxt.font = Font.systemFont(28)
      curHashTxt.centerAlignText()
      
      w.addSpacer(2)   
      
      let activeWorkersTxt = w.addText((activeWorkers || 0) + " active")
      activeWorkersTxt.textColor = Color.gray()
      activeWorkersTxt.font = Font.systemFont(12)
      activeWorkersTxt.centerAlignText()
    
      w.addSpacer(2)
         
      let WorkerscurHashTxt = w.addText(W1curHash.toFixed(1) + "  " + W2curHash.toFixed(1) + "  " + W3curHash.toFixed(1) + "  " + W4curHash.toFixed(1))
      WorkerscurHashTxt.textColor = Color.orange()
      WorkerscurHashTxt.font = Font.systemFont(12)
      WorkerscurHashTxt.centerAlignText()
    
      w.addSpacer(8)
      w.setPadding(0, 0, 0, 0)
      return w
    }
