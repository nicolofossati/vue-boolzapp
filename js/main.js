const { createApp } = Vue

  createApp({
    data() {
      return {
        chat_index: 0,
        newMessage: "",
        answer_check: false,
        filterInput : "",
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
      },

      answer(){
        timeout = setTimeout(() => {
          this.add_message('ok', this.chat_index, 'him', this.answer_check);
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

      filter_list(){ //se ritorna true mostrerà il tag li altrimenti no
        filter=this.filterInput.toLowerCase();
        nome = this.contacts[this.chat_index].name.toLowerCase(); // Michele
        if(filter==""){
          console.log("Sono dentro il primo if");
          return true;
        } else {
          if(nome.includes(filter)){
            console.log("Sono dentro il secondo if");
            return true;
          } else {
            console.log("Sono dentro il primo else");
            return false;
          }
        }
      }

    }
  }).mount('#app')