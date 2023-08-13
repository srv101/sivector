const form = document.getElementsByTagName("form")[0];
const btn = document.getElementById("submit");

form.addEventListener("submit", handalSubmit);

form.addEventListener("change", handalChange);

function handalChange(e) {
  console.log("Change occured");
  let msg = document.getElementById("message");
  if (msg.classList.contains("success")) {
    msg.classList.remove("success");
    msg.innerText = "";
  } else if (msg.classList.contains("error")) {
    msg.classList.remove("error");
    msg.innerText = "";
  }
}

async function handalSubmit(e) {
  e.preventDefault();

  handalChange();

  const submit_btn = document.getElementById("submit");
  const spinner = document.getElementById("spinner");

  // adding spinner effect
  submit_btn.setAttribute("disabled", true);
  spinner.classList.add("spinner-border");
  spinner.classList.add("spinner-border-sm");

  try {
    const formData = new FormData(form);
    const res = await fetch("/career", {
      method: "post",
      body: formData,
    });
    const data = await res.json();

    // removing spinner effect
    submit_btn.removeAttribute("disabled");
    spinner.classList.remove("spinner-border");
    spinner.classList.remove("spinner-border-sm");

    if (data.success) {
      const msg = document.getElementById("message");
      msg.classList.add("success");
      msg.innerText = data.data;
    } else {
      const msg = document.getElementById("message");
      msg.classList.add("error");
      msg.innerText = data.data;
    }
  } catch (err) {
    console.log(err);
  }
}
