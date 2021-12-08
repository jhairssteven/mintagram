<template>
  <div class="back-container">
    <div class="front-container1">
      <div class="row chat-top border-top border-left border-right">
        
        <!-- top of contacts panel, profile phot search, etc -->
        <div class="col-sm-4 border-right border-secondary">
          <img
            :src="require(`@/${user.profile_img}`)"
            alt=""
            class="profile-image rounded-circle"
          />
          <span class="float-right mt-2">
            <!-- search chat icon -->

            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-search"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
              />
              <path
                fill-rule="evenodd"
                d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
              />
            </svg>
            <!-- new chat icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-lg ml-3 mr-3"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            <!-- three dots -->
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-three-dots-vertical mr-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
              />
            </svg>
          </span>
        </div>
        <!-- current chat contact name top bar -->
        <div class="col-sm-8">
          <img
            :src="require(`@/${chatUser.profile_img}`)"
            alt=""
            class="profile-image rounded-circle"
          />
          <span class="ml-2">{{ chatUser.username }}</span>
          <span class="float-right mt-2">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-search"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
              />
              <path
                fill-rule="evenodd"
                d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
              />
            </svg>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-three-dots-vertical mx-3"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
              />
            </svg>
          </span>
        </div>
      </div>
      <div class="row border-bottom border-left border-right">
        <!-- contacts list left side bar -->
        <div class="col-sm-4 contacts border-right border-secondary">
          <div class="contact-table-scroll">
            <table class="table table-hover">
              <tbody style="cursor: pointer">
                <tr
                  v-for="(contact, k) in contacts_list"
                  :key="k"
                  v-on:click="openContactChat(contact.user_name)"
                >
                  <td>
                    <!-- "rerquire(`@..." to use local imgs, for urls just use :src="URL" -->
                    <img
                      :src="require(`@/${contact.img_src}`)"
                      alt=""
                      class="profile-image rounded-circle"
                    />
                  </td>

                  <td>
                    {{ contact.user_name }}<br />
                    <small>{{ contact.last_msg }}</small>
                  </td>

                  <td>
                    <small>{{ contact.date_last_msg }}</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-sm-8 message-area">
          <div class="message-table-scroll" id="chat-mgs-scroll">
            <table class="table">
              <tbody>
                <tr v-for="(message, k) in chat" :key="k">
                  <!-- user's messages -->
                  <template v-if="message.sender_id == user.id_user">
                    <tr>
                      <td>
                        <p
                          class="bg-success p-2 mt-2 mr-5 shadow-sm text-white float-right rounded"
                        >
                          {{ message.msg_txt }}
                        </p>
                      </td>
                      <td>
                        <p class="p-1 mt-2 mr-3 shadow-sm">
                          <small>{{ message.date }}</small>
                        </p>
                      </td>
                    </tr>
                  </template>
                  <!-- destination user's messages -->
                  <template v-else>
                    <tr>
                      <td>
                        <p
                          class="bg-primary p-2 mt-2 mr-5 shadow-sm text-white float-left rounded"
                        >
                          {{ message.msg_txt }}
                        </p>
                      </td>
                      <td>
                        <p class="p-1 mt-2 mr-3 shadow-sm">
                          <small>{{ message.date }}</small>
                        </p>
                      </td>
                    </tr>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- write message box -->
          <div class="row message-box p-3">
            <!-- icons  -->
            <div class="col-sm-2 mt-2">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-emoji-smile"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fill-rule="evenodd"
                  d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z"
                />
                <path
                  d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"
                />
              </svg>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-paperclip mx-2"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"
                />
              </svg>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-cash"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 4H1v8h14V4zM1 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H1z"
                />
                <path
                  d="M13 4a2 2 0 0 0 2 2V4h-2zM3 4a2 2 0 0 1-2 2V4h2zm10 8a2 2 0 0 1 2-2v2h-2zM3 12a2 2 0 0 0-2-2v2h2zm7-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
                />
              </svg>
            </div>
            <div class="col-sm-8">
              <form v-on:submit.prevent="sendMessage">
                <input
                  id="sendMsgInputForm"
                  type="text"
                  class="form-control"
                  placeholder="Write message..."
                  autocomplete="off"
                />
              </form>
            </div>
            <!-- send message button -->
            <div class="col-sm-2 mt-3" style="cursor: pointer">
              <a v-on:click="sendMessage()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-send-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89.471-1.178-1.178.471L5.93 9.363l.338.215a.5.5 0 0 1 .154.154l.215.338 7.494-7.494Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chats",

  data: function () {
    return {
      user: {
        id_user: "1",
        username: "Daniela McCallister",
        email: "raul@mintagram.com",
        profile_img: "images/p3.jpg",
        ocupation: "Desarrolladora",
      },
      chatUser: {
        //destination user's info for current opened chat
        id_user: "2",
        username: "Raul Castañeda",
        email: "raul@mintagram.com",
        profile_img: "images/p2.jpg",
        ocupation: "Ingeniero de Software",
      },
      contacts_list: [
        {
          img_src: "images/p2.jpg",
          user_name: "Raul Castañeda",
          last_msg: "Would you like to come?",
          date_last_msg: "11:04 PM",
        },
        {
          img_src: "images/p1.jpg",
          user_name: "Brad Pitt",
          last_msg: "see you later...",
          date_last_msg: "2:04 AM",
        },
      ],
      chat: [
        {
          msg_txt: "Hi, how are you?",
          date: "11.24 PM",
          sender_id: "1",
        },
        {
          msg_txt: "Hi! It's been a time...",
          date: "11.26 PM",
          sender_id: "2",
        },
        {
          msg_txt:
            "Haan Lockdown ki wajah se company me kuch problem ho rahi thi so kuch logo ko resign dene ko kaha gaya tha.. meri condition thodi thik hai to maine socha koi aur majbur ho kar nikle usse acha main hi nikl jata hu kisi jarurt wale ki job bach jayegi",
          date: "11.26 PM",
          sender_id: "1",
        },
      ],
    };
  },

  methods: {
    openContactChat: function (userName) {
      alert(userName);
    },
    sendMessage: function () {
      let msg = document.getElementById("sendMsgInputForm").value;
      let hrs = new Date().getHours();
      let currentTime =
        (hrs > 12 ? hrs - 12 : hrs) + ":" + new Date().getMinutes() + (hrs > 12 ? " PM" : " AM");

      if (msg != "" && msg != null) {
        this.chat.push({
          msg_txt: msg,
          date: currentTime,
          sender_id: this.user.id_user,
        });

        // adjust scroll all down and reset input form text
        document.getElementById("sendMsgInputForm").value = "";

        let elem = document.getElementById("chat-mgs-scroll");
        elem.scrollTop = elem.scrollHeight;
      } else {
        document.getElementById("sendMsgInputForm").focus();
      }
    },
  },
};
</script>

<style scoped>
td a {
  display: block;
  width: 100%;
}

td a:hover {
  display: block;
  width: 100%;
  cursor: pointer;
}

.front-container1 {
  width: 90%;
  align-self: center;
  margin: 2.5% 5% 2.5% 5%;
}

.chat-top {
  background-color: #ededed;
  min-height: 50px;
  border-radius: 5px 5px 0px 0px;
}

.profile-image {
  margin-top: 7px;
  height: 30px;
  width: 30px;
}

.contacts {
  background-color: #ffffff;
  height: 75vh;
}

.contact-table-scroll {
  overflow-y: scroll;
  height: 75vh;
}

.message-area {
  background-color: #e4e1de;
  min-height: 75vh;
}

.message-table-scroll {
  overflow-y: scroll;
  height: 65vh;
}

.message-box {
  background-color: #f0f0f0;
}
</style>
