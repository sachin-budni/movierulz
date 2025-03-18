(function(){
    const firebaseConfig = {
        apiKey: "AIzaSyAZvjOk2uQJVPcoCSuSkoJOeKM_rBweTZo",
        authDomain: "movie-preview-2019.firebaseapp.com",
        databaseURL: "https://movie-preview-2019.firebaseio.com",
        projectId: "movie-preview-2019",
        storageBucket: "movie-preview-2019.appspot.com",
        messagingSenderId: "1049219658413",
        appId: "1:1049219658413:web:e71ec0ff5fa97aef"
      };

      firebase.initializeApp(firebaseConfig);
      this.ip;

    this.fetchIp =function(){
        let promise = new Promise((res,rej)=>{
            fetch("https://ipv4.jsonip.com").then(d=>d.json()).then(d=>{
                res(d);
            }).catch(e=>rej(e));
        })
        return promise;
    }


    this.fetchIp().then(d=>{
        let da = d.ip.replace('.', '');
        da = da.replace('.', '')
        da = da.replace('.', '')
        firebase.database().ref().child("Views/"+da).set(d);
    });
}());