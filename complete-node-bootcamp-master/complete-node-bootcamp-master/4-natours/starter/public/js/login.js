const login = (email, password) => {
  console.log(email, password);
  //   try {
  //     const res = await fetch('http://127.0.0.1:8000/api/v1/users/login', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         email,
  //         password,
  //       }),
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //     });
  //     console.log(res);
  //   } catch (err) {
  //     console.error(err);
  //   }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
