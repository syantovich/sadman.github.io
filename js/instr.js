

var firstvers;
var otv;
var tipInstr;
var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword=Math.random();
var otvName='SYANTOVICH_SADMAN_OTV';
var lesaName="SYANTOVICH_SADMAN_LESA";
var tipInstrName="SYANTOVICH_SADMAN_TIP";



$.ajax( {
    url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
    data : { f : 'READ', n : otvName},
    success : function(x){
        console.log(x);
        otv=JSON.parse(x.result);
        $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : tipInstrName},
            success : function(x){
                console.log(x);
                tipInstr=JSON.parse(x.result);
                
                start1();
            }, error : function(){
                console.log(-3);
            }
        }
        );
    }, error : function(){
        console.log(-3);
    }
}
);
function start1(){
    function updateOtv(){
        $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : otvName,p:updatePassword },
            success : function(){
                $.ajax( {
                    url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'UPDATE', n : otvName, v : JSON.stringify(otv), p : updatePassword },
                    success:function(){
                        showInBrowser();
                    }
                }
            );
            }, error : function(){
                console.log(-3);
            }
        }
        );
    }
    function updateTip(){
        $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : tipInstrName,p:updatePassword },
            success : function(){
                $.ajax( {
                    url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'UPDATE', n : tipInstrName, v : JSON.stringify(tipInstr), p : updatePassword },
                    success:function(){
                        showInBrowser();
                    }
                }
            );
            }, error : function(){
                console.log(-3);
            }
        }
        );
    }




    function addNewInstr() {
        for (let i = 0; i < otv.length; i++) {
            for (let j = 0; j < tipInstr.length; j++) {
                if (!(tipInstr[j] in otv[i].instr)) {
                    otv[i].instr[tipInstr[j]] = [];
                    otv[i].rem[tipInstr[j]]=[];
                }
            }
        }
    } //Добавление всех типов инструментов ответственным, если они отсутствуют 
    addNewInstr();
    
    // добавление всего списка возможного инструмента на страницу
    
    
    function showInBrowser() {
        let inform = document.querySelector(".moreinfo");
        inform.innerHTML="";
        let divType = document.createElement("div");
        divType.style.width = "auto";
        divType.style.fontWeight = "bold";
        for (let i = -1; i < tipInstr.length; i++) {
            let newDiv = document.createElement("div");
            newDiv.className = "instrOtv";
    
            newDiv.style.textAlign = "left";
    
            divType.appendChild(newDiv);
            if (i == -1) {
                continue;
            }
    
            newDiv.innerHTML = tipInstr[i];
    
        }
    
    
        //Подсчет ИТОГО
        inform.appendChild(divType);
        let divITOGO = document.createElement("div");
        let kol = document.createElement("div");
        kol.className = "instrOtv";
        kol.style.fontWeight = "bold";
        kol.innerText = "Итого";
        divITOGO.appendChild(kol);
    
        for (let i = 0; i < tipInstr.length; i++) {
            let k = 0;
            let r =0;
            for (let j = 0; j < otv.length; j++) {
                k += otv[j].instr[tipInstr[i]].length;
                r+=otv[j].rem[tipInstr[i]].length;
            }
            if(!r){r=""}else{r="<br>"+r+" в ремонте";}
            let kolInstr = document.createElement("div");
            kolInstr.className = "instrOtv";
            kolInstr.style.fontWeight = "bold";
            kolInstr.innerHTML = k+r;
            divITOGO.appendChild(kolInstr);
            inform.appendChild(divITOGO);
        }
    
        //Отображение инструмента ответственных на странице
        for (let i = 0; i < otv.length; i++) {
            let divOtv = document.createElement("div");
            let nameotv = document.createElement("div");
            nameotv.className = "instrOtv";
            nameotv.style.fontWeight = "bold";
            nameotv.innerText = otv[i].name;
            divOtv.appendChild(nameotv);
            for (let j = 0; j < tipInstr.length; j++) {
                let kolInstr = document.createElement("div");
                kolInstr.className = "instrOtv";
                let r= (otv[i].rem[tipInstr[j]].length==0)? "" : "<span style=`color:red`>"+otv[i].rem[tipInstr[j]].length+" в ремонте</span>";
                let k = (otv[i].instr[tipInstr[j]].length==0)? "" : otv[i].instr[tipInstr[j]].length;
                if (k||r) {
                    if(k&&r){
                        k+="<br>";
                    }
                    kolInstr.innerHTML = k+r;
                    kolInstr.style.color = "red";
                }
    
                divOtv.appendChild(kolInstr);
            }
            inform.appendChild(divOtv);
        }
    }
    showInBrowser();

    
    
    let cross = document.querySelectorAll(".maincross");
    cross.forEach((e) => {
        e.addEventListener("click", () => {
            e.parentNode.parentNode.style.display = "none";
        });
    });
    
    
    function dispnone(){
        document.querySelectorAll(".nnone").forEach(e=>{
            e.style.display="none";
        });
    }
    
    function delotvopt(){
        let sel=document.querySelector(".delotv");
        sel.innerHTML="";
        for(let i=0;i<otv.length;i++){
    let k=0;
    for(let key in otv[i].instr){
        k+=otv[i].instr[key].length;
    }
    for(let key in otv[i].rem){
        k+=otv[i].rem[key].length;
    }
            if(!k){
                let option=document.createElement("option");
                option.value=i;
                option.innerText=otv[i].name;
                sel.appendChild(option);
            }
        } 
    
    }
    delotvopt();
    function delotv(){
        let value=document.querySelector(".delotv").value;
        if(value!=""){
            otv.splice(value,1);
        delotvopt();
        updateTip();
        updateOtv();
        }
        
    }
    let delotvbutsub=document.querySelector("#delotvsub");
    delotvbutsub.addEventListener("click",delotv);
    
    
    let addotvbut=document.querySelector("#addotvbut");
    addotvbut.addEventListener("click",()=>{
        let a=document.querySelector(".addotv");
        dispnone();
        
        a.style.display="flex";
    });
    
    
    let buttaddotv = document.querySelector("#addotv");
    buttaddotv.addEventListener("click", () => {
    
        let nObj = buttaddotv.parentNode.querySelector(".name").value;
    
        if (nObj) {
            let newObj={
                name: nObj,
            instr: {},
            rem:{}
            };
            otv.unshift(newObj);
            addNewInstr();
            delotvopt();
            updateTip();
            updateOtv();
            buttaddotv.parentNode.querySelector(".name").value="";
        }
           
    
    });
    function addtipinstr(){
        let addtiptext=document.querySelector(".addtipinstr").querySelector("input").value;
        if(addtiptext){
            tipInstr.push(addtiptext);
            addNewInstr();
            updateTip();
            updateOtv();
        }
        document.querySelector(".addtipinstr").querySelector("input").value="";
        
    }
    let subaddtip=document.querySelector("#addtip");
    subaddtip.addEventListener("click",()=>{
        addtipinstr();
    
    });
    let addtipbut=document.querySelector("#addtipbut");
        addtipbut.addEventListener("click",()=>{
        dispnone();
        document.querySelector(".addtipinstr").style.display="flex  ";
    });
    function deltipopt(){
        let sel=document.querySelector(".deltipinstr");
        sel.innerHTML="";
        for(let i=0;i<tipInstr.length;i++){
        let k=0;
        
        for(let j=0;j<otv.length;j++){
            k+=otv[j].rem[tipInstr[i]].length+otv[j].instr[tipInstr[i]].length
        }
            if(!k){
                let option=document.createElement("option");
                option.value=i;
                option.innerText=tipInstr[i];
                sel.appendChild(option);
            }
        } 
    
    }
    deltipopt();
    function deltip(){
        let tip=document.querySelector(".deltipinstr");
        if(tip.value!==""){
            for(let i=0;i<otv.length;i++){
                delete otv[i].rem[tipInstr[tip.value]];
                delete otv[i].instr[tipInstr[tip.value]]; 
            }
            tipInstr.splice(tip.value,1);
        }
    
    }
    let deltipinstrsub=document.querySelector("#deltipinstrsub");
    deltipinstrsub.addEventListener("click",()=>{
        deltip();
        deltipopt();
        updateTip();
        updateOtv();
    });
    
    
    function peremOtvOption (){
        let peremMain=document.querySelector(".perem");
        let checkbox=peremMain.querySelector("#checkbox");
            let type;    
        if(checkbox.checked==true){type="rem"}else{type="instr"}
    
        let ot=peremMain.querySelector("#ot");
        let kud=peremMain.querySelector("#kud");
        ot.innerHTML="";
        kud.innerHTML="";
        for(let i=0;i<otv.length;i++){
            let newOption=document.createElement('option');
            newOption.innerHTML=otv[i].name;
            newOption.value=i;
            ot.appendChild(newOption);
    
    
            newOption=document.createElement('option');
            newOption.innerHTML=otv[i].name;
            newOption.value=i;
            kud.appendChild(newOption);
        }
        let tip=peremMain.querySelector("#tip");
        tip.innerHTML="";
        for(let i=0;i<tipInstr.length;i++){
            let newOption=document.createElement("option");
            newOption.innerHTML=tipInstr[i];
            newOption.value=i;
            tip.appendChild(newOption);
        }
    
    }
    
    function peremNumberinstr(){
        let peremMain=document.querySelector(".perem");
        let checkbox=peremMain.querySelector("#checkbox");
            let type;    
        if(checkbox.checked==true){type="rem"}else{type="instr"}
        let ot=peremMain.querySelector("#ot").value;
        let tip=peremMain.querySelector("#tip").value;
        let instr=peremMain.querySelector("#number");
        instr.innerHTML="";
        console.log(otv[ot][type]);
        for(let i=0;i<otv[ot][type][tipInstr[tip]].length;i++){
            let option=document.createElement("option");
            option.innerHTML=otv[ot][type][tipInstr[tip]][i];
            option.value=i;
            instr.appendChild(option);
        }
    }
    function perem(){
        let peremMain=document.querySelector(".perem");
        let ot=peremMain.querySelector("#ot").value;
        let kud=peremMain.querySelector("#kud").value;
        let tip=peremMain.querySelector("#tip").value;
        let checkbox=peremMain.querySelector("#checkbox");
            let type;    
        if(checkbox.checked==true){type="rem"}else{type="instr"}
        let inrem;
        if(peremMain.querySelector("#inremcheckbox").checked==true){inrem="rem"}else{inrem="instr"}
        let number=peremMain.querySelector("#number").value;
        if(number){
            console.log(otv[ot]);
            otv[kud][inrem][tipInstr[tip]].unshift(otv[ot][type][tipInstr[tip]][number]);
            otv[ot][type][tipInstr[tip]].splice(number,1);
            updateTip();
            updateOtv();
            peremNumberinstr();
        }
    }
    
    let peremSubm=document.querySelector(".peremSubm");
    peremSubm.addEventListener("click",()=>{
        perem();
    });
    let tip=document.querySelector("#tip");
    tip.addEventListener("change",()=>{
        peremNumberinstr();
    });
    let checkbox=document.querySelector("#checkbox");
    checkbox.addEventListener("change",()=>{
        peremNumberinstr();
    });
    let ot=document.querySelector("#ot");
        ot.addEventListener("change",()=>{
            peremNumberinstr();
        });
            peremOtvOption();
            peremNumberinstr();
    /*     checkbox.addEventListener("change",()=>{
                console.log(checkbox.checked);
        }); */
    let perembut=document.querySelector("#pereminstrbut");
    perembut.addEventListener("click",()=>{
        dispnone();
        document.querySelector(".perem").style.display="flex";
    });
    function addNumInstrOtv(){
        let addMain=document.querySelector(".addinstrotv");
        let otvaddinstr=addMain.querySelector("#otvaddinstr");
        let tipaddinstr=addMain.querySelector("#tipaddinstr");
        let numberDel=addMain.querySelector("#delinst");
        tipaddinstr.innerHTML="";
        otvaddinstr.innerHTML="";
        for(let i=0;i<otv.length;i++){
            let newOpt=document.createElement("option");
            newOpt.innerHTML=otv[i].name;
            newOpt.value=i;
            otvaddinstr.appendChild(newOpt);
        }
        for(let i=0;i<tipInstr.length;i++){
            let newOpt=document.createElement("option");
            newOpt.innerHTML=tipInstr[i];
            newOpt.value=i;
            tipaddinstr.appendChild(newOpt);
        }
        delNum();
    }
    function delNum(){
        let addMain=document.querySelector(".addinstrotv");
        let otvaddinstr=addMain.querySelector("#otvaddinstr");
        let tipaddinstr=addMain.querySelector("#tipaddinstr");
        let numberDel=addMain.querySelector("#delinst");
        for(let i=0;i<otv[otvaddinstr.value]["instr"][tipInstr[tipaddinstr.value]].length;i++){
            let newOpt=document.createElement("option");
            newOpt.innerHTML=otv[otvaddinstr.value]["instr"][tipInstr[tipaddinstr.value]];
            newOpt.value=i;
            numberDel.appendChild(newOpt);
        }
    }
    addNumInstrOtv();
    function add(){
        let addMain=document.querySelector(".addinstrotv");
        let otvaddinstr=addMain.querySelector("#otvaddinstr").value;
        let tipaddinstr=addMain.querySelector("#tipaddinstr").value;
        let numder=addMain.querySelector("#numberaddinstr").value;
        if(numder){
            otv[otvaddinstr]["instr"][tipInstr[tipaddinstr]].unshift(numder);
        }
        updateTip();
        updateOtv();
    }
    function del(){
        let addMain=document.querySelector(".addinstrotv");
        let otvaddinstr=addMain.querySelector("#otvaddinstr").value;
        let tipaddinstr=addMain.querySelector("#tipaddinstr").value;
        let numder=addMain.querySelector("#numberaddinstr").value;
        if(numder){
            otv[otvaddinstr]["instr"][tipInstr[tipaddinstr]].unshift(numder);
        }
        updateTip();
        updateOtv();
    }
    let butAddinstr=document.querySelector(".addinstr");
    butAddinstr.addEventListener("click",()=>{
        add();
    });
    /* unload(); */
    /* load(); */
}
