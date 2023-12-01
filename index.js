class Card {
    constructor (name,cmc){
        this.name = name;
        this.cmc = cmc;
    }
}


class Deck {
    constructor (colors, commander){
        this.colors = colors;
        this.commander = commander;
        this.cards = [
            new Card(`Sol Ring`,1), 
            new Card(`Arcane Signet`,2),
        ];
    }

    addCard (card){
        this.deck.push(card)
    }

    describe (){
        return `This Deck is ${this.colors} and uses ${this.commander} as the Commander and has ${this.cards.length} cards`
    }
}


class Menu {
    constructor() {
        this.decks = [
            new Deck (`UB`, `Wilhelt, the Rotcleaver`),
            new Deck (`RGW`, `Gishath, Sun's Avatar`),
            new Deck (`WR`, `Feather, the Redeemed`),
        ];
        this.decks[0].cards.push(
            new Card(`Rooftop Storm`,6),
            new Card(`Death Baron`,3),
            new Card(`Gravecrawler`,1),
            new Card(`Grimgrin, Corpse-Born`,5),
            new Card(`Entomb`,1),
            new Card(`Buried Alive`,3),
            new Card(`Endless Ranks of the Dead`,4),
            new Card(`Relentless Dead`,2),
            new Card(`Rise of the Dark Realms`,9),
            new Card(`Army of the Damned`,8),
            )
        this.decks[1].cards.push(
            new Card(`Etali, Primal Storm`,6),
            new Card(`Ghalta, Primal Hunger`,12),
            new Card(`Zacama, Primal Calamity`,9),
            new Card(`Silverclad Ferocidons`,7),
            new Card(`Topiary Stomper`,3),
            new Card(`Colossal Majesty`,3),
            new Card(`Ravenous Tyrannosaurus`,6),
            new Card(`Polyraptor`,8),
            new Card(`Atla Palani, Nest Tender`,4),
            new Card(`Star of Extinction`,7),
            )
        this.decks[2].cards.push(
            new Card(`Fight as One`,1),
            new Card(`Defiant Strike`,1),
            new Card(`Storm-Kiln Artist`,4),
            new Card(`Guttersnipe`,3),
            new Card(`Shelter`,1),
            new Card(`Gods Willing`,1),
            new Card(`Young Pyromancer`,2),
            new Card(`Sunforger`,3),
            new Card(`Esper Sentinel`,1),
            new Card(`Zada, Hedron Grinder`,4),
            )
        this.selectedDeck = null;
    }

    start (){
        let selection = this.showMenuOptions();
        while (selection !=0) {
            switch (selection) {
                case '1':
                    this.createDeck();
                    break;
                case '2':
                    this.viewDeck();
                    break;
                case '3':
                    this.deleteDeck();
                    break;
                case '4':
                    this.displayDecks();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMenuOptions();
        }

        alert(`You Planeswalked away!`);
    }


    showMenuOptions (){
        return prompt(`
        1) Create New Deck
        2) View Existing Decks
        3) Delete a Deck
        4) Display all Decks
        0) Planeswalk away
        `);
    }


    createDeck (){
        let commander = prompt(`Enter the name of your Commander`);
        let colors = prompt(`Enter the Commanders Color Identity`);
        this.decks.push(new Deck(colors, commander));
    }

    showDeckMenuOptions (deckInfo){
        return prompt (`
        1) Add a Card
        2) Delete a Card
        0) Back
        ------
        ${deckInfo}
        `)
    }

    
    //used to review the current construction of the deck
    viewDeck (){
       let index = prompt(`Enter the index of the Deck you would like to view:`);
       if (index > -1 && index < this.decks.length) {
            this.selectedDeck = this.decks[index];
            let description = `Commander: ${this.selectedDeck.commander}
            Color Identity: ${this.selectedDeck.colors} \n` ;

            for (let i=0; i < this.selectedDeck.cards.length; i++){
                description += i + `) ` + this.selectedDeck.cards[i].name + ` - ` + this.selectedDeck.cards[i].cmc + `\n`;
            }

            description += (99 - this.selectedDeck.cards.length) + ` cards left to add` +`\n`;

            let startingCMC = 0;
            let avgCMC = 0;            
            for (let i=0; i < this.selectedDeck.cards.length; i++){
                (startingCMC += Number(this.selectedDeck.cards[i].cmc));
                avgCMC = (startingCMC / this.selectedDeck.cards.length);
                } 
            

            description += `average CMC: `+ Math.round(avgCMC);
        


            let selection = this.showDeckMenuOptions (description);
                    switch (selection){
                    case `1`:
                        this.addCard();
                        break;
                    case `2`:
                        this.deleteCard();
                        break;
            }
        }
    }


    //adds a card to the current decks array
    addCard(){
        let name = prompt(`Enter the Card name:`);
        let cmc = prompt(`Enter the Converted Mana Cost of the Card:`);

        this.selectedDeck.cards.push(new Card(name,cmc));

    }


    //used to remove a card from the deck array
    deleteCard(){
        let index = prompt(`Enter the index of the card you are removing`);
        if (index > -1 && index < this.selectedDeck.cards.length){
            this.selectedDeck.cards.splice(index,1);
        }
    }

    //used to remove a deck from the created array
    deleteDeck(){
        let index = prompt(`Enter the index of the Deck you are removing:`)
        if (index > -1 && index < this.decks.length){
            this.decks.splice(index,1);
        }
    }


    //Used to show all the decks currently created
    displayDecks (){
        let existingDecks = ``;
        for (let i=0; i < this.decks.length; i++){
            existingDecks += i + `) ` + this.decks[i].commander + ` - ` + this.decks[i].colors + `\n`;
        }
        alert (existingDecks)
    }

    


}



//calling an instance of Menu to produce the menu so it will run when page is loaded.
let menu = new Menu ();
menu.start();


