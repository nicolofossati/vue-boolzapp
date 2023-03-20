/* BONUS
1-  evitare che l’utente possa inviare un messaggio vuoto o composto solamente da spazi
2-  A) cambiare icona in basso a destra (a fianco all’input per scrivere un nuovo messaggio) finché l’utente sta 
    scrivendo: di default si visualizza l’icona del microfono, quando l’input non è vuoto si visualizza l’icona 
    dell’aeroplano. Quando il messaggio è stato inviato e l’input si svuota, si torna a visualizzare il microfono.
    B) inviare quindi il messaggio anche cliccando sull’icona dell’aeroplano
*/

const { createApp } = Vue
  createApp({
    data() {
      return {
        chat_index: 0,
        newMessage: "",
        answer_check: false,
        filterInput : "",
        dropdown_class : "drop-down d-none",
        showIcon : true,
        answerList:['È certo','	È decisamente così','Senza dubbio', 'Sì, sicuramente', 'Puoi fare affidamento su di esso', 'Per come la vedo io, sì', 'Molto probabilmente', 'ok', 'I segni indicano sì', 'La risposta è sfocata, riprova','Si prega di chiedere di nuovo più tardi','Meglio non dirtelo ora','Non prevedibile adesso','Concentrati e chiedi di nuovo','Non contarci','	La mia risposta è no','Le mie fonti dicono di no','Molto discutibile'],
        contacts: [
          {
            name: 'Michele',
            avatar: './img/avatar_1.jpg',
            visible: true,
            online: "ultimo accesso alle 08:56",
            messages: [
              {
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent',
              dropdown: false
              },
              {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati di stendere i panni',
              status: 'sent',
              dropdown: false
              },
              {
              date: '10/01/2020 16:15:22',
              message: 'Tutto fatto!',
              status: 'received',
              dropdown: false
              }
            ],
          },
          {
            name: 'Fabio',
            avatar: './img/avatar_2.jpg',
            visible: true,
            online: "ultimo accesso alle 08:56",
            messages: [
              {
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent',
                dropdown: false
              },
              {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received',
                dropdown: false
              },
              {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent',
                dropdown: false
              }
            ],
          },
          {
            name: 'Samuele',
            avatar: './img/avatar_3.jpg',
            visible: true,
            online: "ultimo accesso alle 08:56",
            messages: [
              {
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received',
                dropdown: false
              },
              {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent',
                dropdown: false
              },
              {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received',
                dropdown: false
              }
            ],
          },
          {
            name: 'Alessandro B.',
            avatar: './img/avatar_4.jpg',
            visible: true,
            online: "ultimo accesso alle 08:56",
            messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent',
              dropdown: false
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'Si, ma preferirei andare al cinema',
            status: 'received',
            dropdown: false
            }
          ],
          },
          {
          name: 'Alessandro L.',
          avatar: './img/avatar_5.jpg',
          visible: true,
          online: "ultimo accesso alle 08:56",
          messages: [
          {
          date: '10/01/2020 15:30:55',
          message: 'Ricordati di chiamare la nonna',
          status: 'sent',
          dropdown: false
          },
          {
          date: '10/01/2020 15:50:00',
          message: 'Va bene, stasera la sento',
          status: 'received',
          dropdown: false
          }],
          },
          {
          name: 'Claudia',
          avatar: './img/avatar_6.jpg',
          visible: true,
          online: "ultimo accesso alle 08:56",
          messages: [
          {
          date: '10/01/2020 15:30:55',
          message: 'Ciao Claudia, hai novità?',
          status: 'sent',
          dropdown: false
          },
          {
          date: '10/01/2020 15:50:00',
          message: 'Non ancora',
          status: 'received',
          dropdown: false
          },
          {
          date: '10/01/2020 15:51:00',
          message: 'Nessuna nuova, buona nuova',
          status: 'sent',
          dropdown: false
          }
          ],
          },
          {
          name: 'Federico',
          avatar: './img/avatar_7.jpg',
          visible: true,
          online: "ultimo accesso alle 08:56",
          messages: [
          {
          date: '10/01/2020 15:30:55',
          message: 'Fai gli auguri a Martina che è il suo compleanno!',
          status: 'sent',
          dropdown: false
          },
          {
          date: '10/01/2020 15:50:00',
          message: 'Grazie per avermelo ricordato, le scrivo subito!',
          status: 'received',
          dropdown: false
          }
          ],
          },
          {
          name: 'Davide',
          avatar: './img/avatar_8.jpg',
          visible: true,
          online: "ultimo accesso alle 08:56",
          messages: [
          {
          date: '10/01/2020 15:30:55',
          message: 'Ciao, andiamo a mangiare la pizza stasera?',
          status: 'received',
          dropdown: false
          },
          {
          date: '10/01/2020 15:50:00',
          message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
          status: 'sent',
          dropdown: false
          },
          {
          date: '10/01/2020 15:51:00',
          message: 'OK!!',
          status: 'received',
          dropdown: false
          }
          ],
          }
        ]
      }
    },
    methods : {
      refresh_index(i){
        this.chat_index = i;
      },

      add_message(mex, user, from, already_add){ // mex contiene il contenuto del testo, user rappresenta l'indice del destinatario
        if(!mex.trim().length==0){ //se mex vuoto o nulla ritorna true altrimenti false, trim toglie ogni spazio vuoto prima e dopo mex
          let currentDate = this.createNewDateToString();
  
          if(from=="him"){
            statu = 'received';
          } else {
            statu = 'sent';
          }
  
          let message = {
            date: currentDate,
            message: mex,
            status: statu
          }
          this.contacts[user].messages.push(message);
  
          this.newMessage = "";
          if(!already_add){
            this.answer_check = true;
            this.answer();
          }
        }
      },

      remove_message(index){
        this.contacts[this.chat_index].messages.splice(index,1);
      },

      answer(){
        const n = this.randomNum(0, this.answerList.length-1);
        this.contacts[this.chat_index].online="sta scrivendo...";

        timeout = setTimeout(() => {
          this.add_message(this.answerList[n], this.chat_index, 'him', this.answer_check);
          this.contacts[this.chat_index].online="online";
          timeout = setTimeout(() => {
            let ore = this.createNewDateToString().substring(11,16);
            this.contacts[this.chat_index].online=`ultimo accesso alle ${ore}`;
          }, 2000);
        }, 1000);
      },
      
      createNewDateToString(){
        const now = luxon.DateTime.local(); // genera la data corrente utilizzando il fuso orario del browser
        //console.log(now.toISO()); metodo per stampare la data ---> '2023-03-18T20:22:24.257+01:00' e deve diventare '10/01/2020 15:30:55' 
        day = this.set_zero(now.day.toString());
        month = this.set_zero(now.month.toString());
        year = now.year.toString();
        hour = this.set_zero(now.hour.toString());
        minute = this.set_zero(now.minute.toString());
        second = this.set_zero(now.second.toString());
        myFormatting = day +"/"+ month+"/"+year+" "+hour+":"+minute+":"+second; //formattazione uguale a messages.message
        console.log(myFormatting);
        return myFormatting;
      },

      set_zero(attribute){
        if(attribute.length==1){
          attribute = `0` + attribute;
        }
        return attribute;
      },

      filter_list(name){ //se ritorna true mostrerà il tag li altrimenti no
        filter=this.filterInput.toLowerCase();
        nome = name.toLowerCase();
        if(filter==""){
          return true;
        } else {
          if(nome.includes(filter)){
            return true;
          }
          return false;
        }
      },

      show_drop_down(index){
        this.contacts[this.chat_index].messages[index].dropdown = true;

        console.log(this.contacts[this.chat_index].messages.length);
        
        for(let i=0; i<this.contacts[this.chat_index].messages.length; i++){
          if(i!=index){
            this.contacts[this.chat_index].messages[i].dropdown = false;
          }
        }
        
      },

      change_showIcon(){
        if(this.newMessage.trim().length !=0){
          this.showIcon = false;
        } else {
          this.showIcon = true;
        }
      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
      }
    }
  }).mount('#app')