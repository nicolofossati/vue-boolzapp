const { createApp } = Vue

  createApp({
    data() {
      return {
        chat_index: 0,
        newMessage: "",
        timeout: null,
        answer_check: false,
        contacts: [
          {
            name: 'Michele',
            avatar: './img/avatar_1.jpg',
            visible: true,
            messages: [
              {
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
              },
              {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati di stendere i panni',
              status: 'sent'
              },
              {
              date: '10/01/2020 16:15:22',
              message: 'Tutto fatto!',
              status: 'received'
              }
            ],
          },
          {
            name: 'Fabio',
            avatar: './img/avatar_2.jpg',
            visible: true,
            messages: [
              {
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
              },
              {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
              },
              {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent'
              }
            ],
          },
          {
            name: 'Samuele',
            avatar: './img/avatar_3.jpg',
            visible: true,
            messages: [
              {
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
              },
              {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
              },
              {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received'
              }
            ],
          },
          {
            name: 'Alessandro B.',
            avatar: './img/avatar_4.jpg',
            visible: true,
            messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'Si, ma preferirei andare al cinema',
            status: 'received'
            }
          ],
          },
          {
          name: 'Alessandro L.',
          avatar: './img/avatar_5.jpg',
          visible: true,
          messages: [
          {
          date: '10/01/2020 15:30:55',
          message: 'Ricordati di chiamare la nonna',
          status: 'sent'
          },
          {
          date: '10/01/2020 15:50:00',
          message: 'Va bene, stasera la sento',
          status: 'received'
          }
          ],
          },
          {
          name: 'Claudia',
          avatar: './img/avatar_6.jpg',
          visible: true,
          messages: [
          {
          date: '10/01/2020 15:30:55',
          message: 'Ciao Claudia, hai novità?',
          status: 'sent'
          },
          {
          date: '10/01/2020 15:50:00',
          message: 'Non ancora',
          status: 'received'
          },
          {
          date: '10/01/2020 15:51:00',
          message: 'Nessuna nuova, buona nuova',
          status: 'sent'
          }
          ],
          },
          {
          name: 'Federico',
          avatar: './img/avatar_7.jpg',
          visible: true,
          messages: [
          {
          date: '10/01/2020 15:30:55',
          message: 'Fai gli auguri a Martina che è il suo compleanno!',
          status: 'sent'
          },
          {
          date: '10/01/2020 15:50:00',
          message: 'Grazie per avermelo ricordato, le scrivo subito!',
          status: 'received'
          }
          ],
          },
          {
          name: 'Davide',
          avatar: './img/avatar_8.jpg',
          visible: true,
          messages: [
          {
          date: '10/01/2020 15:30:55',
          message: 'Ciao, andiamo a mangiare la pizza stasera?',
          status: 'received'
          },
          {
          date: '10/01/2020 15:50:00',
          message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
          status: 'sent'
          },
          {
          date: '10/01/2020 15:51:00',
          message: 'OK!!',
          status: 'received'
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
        const now = luxon.DateTime.local(); // genera la data corrente utilizzando il fuso orario del browser
        //console.log(now.toISO()); metodo per stampare la data ---> '2023-03-18T20:22:24.257+01:00' e deve diventare '10/01/2020 15:30:55' 
        day = now.day.toString();
        month = now.month.toString();
        year = now.year.toString();
        hour = now.hour.toString();
        minute = now.minute.toString();
        second = now.second.toString();
        if(day.length==1){
          day = "0" + day;
        }
        if(month.length==1){
          month = `0`+ month;
        }
        if(hour.length==1){
          hour = `0` +hour;
        }
        if(minute.length==1){
          minute = `0`+minute;
        }
        if(second.length==1){
          second = `0`+second;
        }
        myformatting = day +"/"+ month+"/"+year+" "+hour+":"+minute+":"+second; //sovrascrive la var now nella formattazione di messages.message
        console.log(myformatting);
        let status = "";
        if(from=="him"){
          statu = 'received';
        } else {
          statu = 'sent';
        }

        let message = {
            date: myformatting,
            message: mex,
            status: statu
          }
        this.contacts[user].messages.push(message);

        this.newMessage = "";
        if(!already_add){
          this.answer_check = true;
          this.answer();
        }
      },

      answer(){
        this.timeout = setTimeout(() => {
          this.add_message('ok', this.chat_index, 'him', this.answer_check);
        }, 1000);
      }
      
    }
  }).mount('#app')