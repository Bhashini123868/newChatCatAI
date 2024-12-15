const chatList = [];

let user = "";
var md = window.markdownit();


document.getElementById("selectUser").addEventListener("change", function () {
  user = this.value;
  console.log(this.value);
});
function sendMassage() {
  let txtUserInput = document.getElementById("txtUserInput").value;
  let chatBubble = "";
  if (user === "Me") {
    chatBubble = `<h3 class="text-end bg-success text-white ">${txtUserInput}</h3>`; 
  } else {
    chatBubble = `<h3 class="text-end bg-success text-white">${txtUserInput}</h3>`;
    chatList.push(chatBubble);
    loadChatBox();

    console.log("Hello");
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "contents": [
      {
        "parts": [
          {
            "text": txtUserInput
          }
        ]
      }
    ]
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };
  fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      
      console.log(result.candidates[0].content.parts[0].text);
      chatBubble=`<h3 class="text-start bg-secondary text-white">${md.render(result.candidates[0].content.parts[0].text)}</h3>`;
      chatList.push(chatBubble);
      loadChatBox();
    })
    .catch((error) => console.error(error));

    loadChatBox();
}
function loadChatBox() {
  document.getElementById("chatBox").innerHTML = "";
  chatList.forEach(element => {
    document.getElementById("chatBox").innerHTML += element;
  })
}


