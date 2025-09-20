//moaaiiii
var player = {
    photons: new Decimal("0"), // just ignore these 209 billion red dots. you can't do anything.
    decay: new Decimal("1"), //btw it throws an error cuz Decimal is not defined in this js file, but since break_eternity is called in the html file it'll work
    light: new Decimal("0"), //the red dots are errors I assume
    prisms: new Decimal("0"), //yes, btw do we add tabs?
    canClickPhoton: true,
    lightGain: new Decimal("0"),
    upgrades: {
      photon: {
        cost001: new Decimal("5"),
        boost001: new Decimal("1"),
        level001: new Decimal("0"),
        cost002: new Decimal("20"),
        boost002: new Decimal("0"),
        level002: new Decimal("0"),
        cost003: new Decimal("1000"),
        boost003: new Decimal("0"),
        level003: new Decimal("0"),
      },
    },
}
//var upg = upgrades

function displayTab(tabName) { // tab 
    var allTabs = document.getElementsByClassName("tab")
    for (var i = 0; i < allTabs.length; i++) {
        var checkingTab = allTabs.item(i);
        if (checkingTab.id == tabName) {
            checkingTab.style.display = "block";
        } else {
            checkingTab.style.display = "none";
        }
    }
}

function setVariables() {
    // .add(1)
    var originaldecay = Decimal.pow(player.photons,0.5).add(1)
    var l = player.light.cmp(new Decimal("1")) > -1 ? player.light : new Decimal("1") // no negatives or WHAT??? in log
    originaldecay = originaldecay.pow(new Decimal("1").div((l.add(1)).log10().add(1))) // ah yes. all the .add(1)s. Please banish me for the spaghetti
    player.decay = originaldecay.sub(player.upgrades.photon.boost002) // negative decay :fearful:
    if(
        player.photons.cmp(new Decimal("2500")) == 1 ||
        player.photons.cmp(new Decimal("2500")) == 0
    ) {
        player.lightGain = (Decimal.pow(photons.div(new Decimal("2500")),0.75)).mul(1.1**player.upgrades.photon.level003.add(1))
        document.getElementById("lightgain").innerHTML = "You will gain " + player.lightGain + " Light" //omg w2 refernce???e/g/sdg/
    } else {
        document.getElementById("lightgain").innerHTML = "2500 Photons required to do an Illumination."
    }
}

function gainCurrencies() {
    //ugh now we have to update photons per second
    //make it measure gain, not calculate gain
    var photgain = new Decimal("0.5").mul(player.upgrades.photon.boost001)
    player.photons = player.photons.add(photgain.div(player.decay))
}

const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function updateHTML() {
    document.getElementById("photon").innerHTML = "You have " + format(player.photons) + " photons."
    var photgain = new Decimal("0.5").mul(player.upgrades.photon.boost001)
    document.getElementById("pps").innerHTML = "You gain " + format((photgain.div(player.decay)).mul(20)) + " photons per second."
    document.getElementById("decay").innerHTML = "Your photon gain is divided by " + format(player.decay) + "."
}

function photonButton() {
    if(player.canClickPhoton == true) {
        var gain = ((new Decimal("0.5").div(player.decay)).mul(new Decimal("60")))
        player.photons = player.photons.add(gain.mul(player.upgrades.photon.boost001)) //wdwd
        player.canClickPhoton = false
        document.getElementById("button").innerHTML = "+" + format(gain) + " Photons [cooling down]"
        sleep(5000).then(() => {
            player.canClickPhoton = true
            document.getElementById("button").innerHTML = "Create Photons"
        });
    }
}

function doubleAndGiveToNextPerson() {
    player.photons = (player.photons).mul(2)
}

//Let's start the upgrade line!
function upg001() {
    if(
        player.photons.cmp(player.upgrades.photon.cost001) > -1
    ) {
        player.photons = player.photons.sub(player.upgrades.photon.cost001)
        player.upgrades.photon.cost001 = player.upgrades.photon.cost001.mul(1.2).round()
        player.upgrades.photon.boost001 = player.upgrades.photon.boost001.mul(1.2)
        player.upgrades.photon.level001 = player.upgrades.photon.level001.add(1)
        document.getElementById("001").innerHTML = "LV" + player.upgrades.photon.level001 + " x1.2 photons - " + player.upgrades.photon.cost001 + " Photons"
    }
}

function upg002() {
    if(
        player.photons.cmp(player.upgrades.photon.cost002) > -1 && //now instead of A or (B and C) its (A or B) and C its ok dw...Yes14513 do we gartic y/n if nah we can do sg if you want
        player.upgrades.photon.level002.cmp(new Decimal("5")) == -1 //why this cmp |cuz i'm capping off the level limit (too many = Bad)    wakey
    ) {
        console.log("Chainsmoker has a chance to spawn if the player’s current or previous room has a valid hiding spot. The lights will flicker briefly, and Chainsmoker will begin slowly advancing from behind while emitting a loud sound that generally has a chain-like sound. After a short while, Chainsmoker will move slowly through the room. Instead of killing all players in its path before disappearing while it passes through, Chainsmoker teleports you to an unknown location, looking like a wasteland. At the end, there is a Paranoia’s Box, when at the end of the path the box opens and then kills the player. Players who hide in time or escape Chainsmoker's line of sight before it passes through will be safe.")
        player.photons = player.photons.sub(player.upgrades.photon.cost002)
        player.upgrades.photon.cost002 = player.upgrades.photon.cost002.mul(3).round()
        player.upgrades.photon.boost002 = player.upgrades.photon.boost002.add(0.01)
        player.upgrades.photon.level002 = player.upgrades.photon.level002.add(1)
        document.getElementById("002").innerHTML = "LV" + player.upgrades.photon.level002 + "/5 -0.01 decay pow - " + player.upgrades.photon.cost002 + " Photons"
    }
}

function upg003() {
  if(
        (player.photons.cmp(player.upgrades.photon.cost003) == 1 || //should've put it in brackets, done that
        player.photons.cmp(player.upgrades.photon.cost003) == 0) && //now instead of A or (B and C) its (A or B) and C its ok dw...Yes14513 do we gartic y/n if nah we can do sg if you want
        player.upgrades.photon.level003.cmp(new Decimal("3")) == -1 //why this cmp |cuz i'm capping off the level limit (too many = Bad)    wakey
  ) {
        player.photons = player.photons.sub(player.upgrades.photon.cost003)
        player.upgrades.photon.cost003 = player.upgrades.photon.cost003.mul(2.5).round()
        player.upgrades.photon.boost003 = player.upgrades.photon.boost003.add(1)
        player.upgrades.photon.level003 = player.upgrades.photon.level003.add(1)
        document.getElementById("003").innerHTML = "LV" + upgrades.photon.level003 + "/3 +x0.1 Light gain - " + upgrades.photon.cost003 + " Photons"
  }
}

//And aw dang it, it's done.

function lightReset() { //illumination STUDIOS MINIONASDGNINIOENIYEWING AHHHHHHHHHHHH
    //Ntts deaueah
    if(
        player.photons.cmp(new Decimal("2500")) > -1
    ) {
        player.photons = new Decimal("0")
        player.decay = new Decimal("0")
        //a lightgain already exists
        //you can update the formula with that ig mine is just cube rooted photons
        //refer to setVariables()
        //gtg cya
        player.light = player.light.add(player.lightGain) //oh hey igtg now but illumination is finished

        player.upgrades.photon.cost001 = new Decimal("5")
        player.upgrades.photon.boost001 = new Decimal("1")
        player.upgrades.photon.level001 = new Decimal("0")
        player.upgrades.photon.cost002 = new Decimal("20")
        player.upgrades.photon.boost002 = new Decimal("0")
        player.upgrades.photon.level002 = new Decimal("0")
      
      //can u code in upgrade 3 plsssssssssssssssssssssssssssssss
      //-gai cya
      //what would it do tho
      //it says x1.1 light gain every level (caps at level 3, too low?)
      //1.1 is more bslace ndned
      //imo oit might be too low
      //actually
      //lets do light boosters after light reset
      //i'l
      
    } else {
        alert("You need 2500 Photons to Illuminate. Did you not read that goober???")
    }
}

var gameLoop = window.setInterval(function() {
    gainCurrencies()
    setVariables()
    updateHTML()
}, 50)

//going into an sg public
//nvm my wifi aint working

//can you make upgrade ideas
//uhhhh can you get to light yet legit
//we can use cmp
//val1.cmp(val2)
//Returns 1 if val1 > val2
//Returns 0 if val1 == val2
//Returns -1 if val1 < val2
//https://garticphone.com/en/?c=0022a06c61 trust
//eh maybe
//you got any upg ideas?        
// uh
// subtracts 0.01 from the decay pow (it starts at 0.1)
// max at 5
//it does but it just stays at 0.63???
//probably fixed: photgain was photons + photon gain this frame
//probably fixed II: its now just photon gain this frame
//probably fixed III: who was stupid enough to do this...smh
//probably fixed IV: the final part of the quadrology...will we make upg001? YES!!!

//i thnk noah is slendermen guys

//https://garticphone.com/en/?c=0022a06c61
//join or i'll put you in the gameLoop
//wdwd
//oh you're in
//get the gc trust me bro
//IM BACK