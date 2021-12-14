
var firstvers;
var lesa;
var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword=Math.random();
var otvName='SYANTOVICH_SADMAN_OTV';
var lesaName="SYANTOVICH_SADMAN_LESA";
var tipInstrName="SYANTOVICH_SADMAN_TIP";



$.ajax( {
    url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
    data : { f : 'READ', n : lesaName},
    success : function(x){
        console.log(x);
        lesa=JSON.parse(x.result);
        start();
    }, error : function(){
        console.log(-3);
    }
}
);
function start(){
    setInterval(()=>{
        $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : lesaName,},
            success : function(x){
                console.log(x);
                lesa=JSON.parse(x.result);
                showInBrowser(lesa);
            }, error : function(){
                console.log(-3);
            }
        }
        );
    },7000);
    function updateLesa(){
        $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : lesaName,p:updatePassword },
            success : function(){
                ready(lesa);
            }, error : function(){
                console.log(-3);
            }
        }
        );
        function ready(callresult){

            // нам всё равно, что было прочитано -
            // всё равно перезаписываем
            $.ajax( {
                    url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'UPDATE', n : lesaName, v : JSON.stringify(lesa), p : updatePassword },
                    success:showInBrowser(lesa)
                }
            );
        
        }
    }
    function showInBrowser(o) {
        let info = document.querySelector(".inform");
    
        if (!firstvers) {
            firstvers = info.innerHTML;
        }
        info.innerHTML = firstvers;
        let sum = [];
        sum[0] = [0, 0, 0, 0, 0, 0, 0];
        sum[1] = [0, 0, 0, 0, 0, 0];
        sum[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        sum[3] = [0, 0, 0, 0, 0, 0, 0, 0];
        sum[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < o.length; i++) {
            var nextObj = o[i];
            let nextLes = nextObj.lesa;
            for (let y = 0; y < nextLes.length; y++) {
                for (let j = 0; j < nextLes[y].length; j++) {
                    let nextEl = nextLes[y][j];
                    sum[y][j] += nextEl;
                }
            }
        }
        let allLesa = document.querySelectorAll('.les');
        allLesa.forEach((e, i) => {
            let newS = e.querySelectorAll(".sum");
            newS.forEach((eS, iS) => {
                eS.innerHTML = `${sum[i][iS]}`;
            });
            let name = e.querySelector(".namelesa");    
            for (let i = 0; i < lesa.length; i++) {
                let newDiv = document.createElement('div');
                newDiv.innerHTML = `${lesa[i].nameObj}</br>${lesa[i].famOtv}`;
                name.appendChild(newDiv);
            }
            let l = e.querySelectorAll(".l");
            for (let y = 0; y < lesa.length; y++) {
                for (let inL = 0; inL < l.length; inL++) {
                    let newDiv = document.createElement('div');
                    if (lesa[y].lesa[i][inL]) {
                        newDiv.innerHTML = `${lesa[y].lesa[i][inL]}`;
                        newDiv.style.color = "red";
                    } else {
                        newDiv.innerHTML = ``;
                        newDiv.style.color = "grey";
                    }
    
                    l[inL].append(newDiv);
                }
            }
        });
    
    
    }
    let koladd = 0,
        koldel = 0;
    showInBrowser(lesa);
    let newDiv = document.createElement("div");
    let select = document.querySelector("#select");
    let selkud = document.querySelector("#kud"),
        selot = document.querySelector("#ot"),
        seltip = document.querySelector("#tip");
    
    let namelesa = document.querySelectorAll(".name");
    
    for (let i = 0; i < namelesa.length; i++) {
        let newOption = document.createElement("option");
        let v = namelesa[i].innerText;
        newOption.innerHTML = v;
        newOption.value = `${i}`;
        select.append(newOption);
    }
    inputAdd();
    select.addEventListener("change", inputAdd);
    
    function inputAdd() {
        let numLes = select.value;
        let allLesa = document.querySelectorAll(".les");
        let l = allLesa[+numLes].querySelectorAll(".l");
        let main = document.querySelector(".add").querySelector(".localmain");
        main.innerHTML = "";
        for (let i = 0; i < l.length; i++) {
            let first = l[i].querySelector(".first");
            let newDiv = document.createElement("div");
            newDiv.innerHTML = `<span>${first.innerHTML}</span> :<br><input type="number" class="inp">`;
            main.appendChild(newDiv);
        }   
        let newDiv = document.createElement("div")
        let selobj = document.createElement("select");
        selobj.id = "idobj";
        for (let i = 0; i < lesa.length; i++) {
            let opt = document.createElement("option");
            opt.innerHTML = lesa[i].nameObj + " - " + lesa[i].famOtv;
            opt.value = i;
            selobj.appendChild(opt);
        }
        newDiv.innerHTML = "Кому добавить:  <br>";
        newDiv.appendChild(selobj);
        main.appendChild(newDiv);
        let opt = document.createElement("option");
        newDiv = document.createElement("div");
        newDiv.innerHTML = "<br><input type='submit' id='subAdd' value='Добавить леса'>";
        main.appendChild(newDiv);
        newDiv = document.createElement('div');
        newDiv.innerHTML = "<br><input type='submit' id='subdel' value='Удалить леса'>";
        main.appendChild(newDiv);
        let subAdd = document.querySelector("#subAdd");
        subAdd.addEventListener("click", () => {
            let inp = document.querySelectorAll(".inp");
            let idobj = document.querySelector("#idobj").value;
            let idtypelesa = document.querySelector("#select").value;
            for (let i = 0; i < inp.length; i++) {
                lesa[idobj].lesa[idtypelesa][i] += +inp[i].value;
            }
            updateLesa();
            newDel = document.querySelector(".del");
            koladd++;
            newDel.innerText = `Добавление ${koladd}  прошло успешно`;
    
        });
        let subdel = document.querySelector("#subdel");
        subdel.addEventListener("click", () => {
            let inp = document.querySelectorAll(".inp");
            let idobj = document.querySelector("#idobj").value;
            let idtypelesa = document.querySelector("#select").value;
    
            for (let i = 0; i < inp.length; i++) {
                lesa[idobj].lesa[idtypelesa][i] -= +inp[i].value;
                if (lesa[idobj].lesa[idtypelesa][i] < 0) {
                    lesa[idobj].lesa[idtypelesa][i] = 0;
                }
            }
            updateLesa();
            newDel = document.querySelector(".del");
            koldel++;
            newDel.innerText = `Удаление ${koldel}  прошло успешно`;
        });
    }
    
    function perem() {
        let numLes = +seltip.value,
            numot = +selot.value,
            numkud = +selkud.value;
        let allLesa = document.querySelectorAll(".les");
        let l = allLesa[+numLes].querySelectorAll(".l");
        let main = document.querySelector(".perem").querySelector(".localmain");
        main.innerHTML = "";
        main.style.margin = "20px 0px 20px 20px";
    
        for (let i = 0; i < lesa.length; i++) {
            let opt = document.createElement("option");
            opt.innerHTML = lesa[i].nameObj + " - " + lesa[i].famOtv;
            opt.value = i;
            selot.appendChild(opt);
        }
        for (let i = 0; i < lesa.length; i++) {
            let opt = document.createElement("option");
            opt.innerHTML = lesa[i].nameObj + " - " + lesa[i].famOtv;
            opt.value = i;
            selkud.appendChild(opt);
        }
        for (let i = 0; i < namelesa.length; i++) {
            let opt = document.createElement("option");
            opt.innerHTML = namelesa[i].innerText;
            opt.value = i;
    
            seltip.appendChild(opt);
        }
        for (let i = 0; i < l.length; i++) {
            let first = l[i].querySelector(".first");
            let newDiv = document.createElement("div"),
                newSpan = document.createElement("span");
            newDiv.appendChild(newSpan);
            let newSelect = document.createElement("select");
            newSelect.className = "peremSel";
            newSelect.style.marginBottom = "10px";
            newDiv.appendChild(newSelect);
            newSpan.innerText = first.innerHTML;
            let newLes = lesa[+numot].lesa[numLes];
    
            for (let j = 0; j <= newLes[i]; j++) {
    
                let newOption = document.createElement("option");
                newOption.innerText = j;
                newOption.value = j;
                newSelect.appendChild(newOption);
            }
    
    
            main.appendChild(newDiv);
        }
    
    
    }
    let buttonSub = document.querySelector(".peremSubm");
    buttonSub.addEventListener("click", () => {
        let allSelPerem = document.querySelectorAll(".peremSel");
    
        for (let i = 0; i < allSelPerem.length; i++) {
            let kol = +allSelPerem[i].value;
    
            if (lesa[+selot.value].lesa[+seltip.value][i] >= kol) {
                lesa[+selot.value].lesa[+seltip.value][i] -= kol;
                lesa[+selkud.value].lesa[+seltip.value][i] += kol;
            }
    
        }
        perem();
        updateLesa();
    });
    seltip.addEventListener("change", () => {
        perem();
    });
    perem();
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
    let addbut = document.querySelector("#addbut");
    addbut.addEventListener("click", () => {
        let add = document.querySelector(".add");
        dispnone();
        add.style.display = "flex";
    });
    let peremButt = document.getElementById("perem");
    peremButt.addEventListener("click", () => {
        dispnone();
        document.querySelector(".perem").style.display = "flex";
        perem();
    
    });
    
    document.querySelector("#objadd").addEventListener("click", () => {
        dispnone();
        document.querySelector(".addObj").style.display = "flex";
    
    });
    let buttadd = document.querySelector(".addObjButt");
    buttadd.addEventListener("click", () => {
        let nObj = document.querySelector("#addName").value;
        let fObj;
        console.log(!nObj.value);  
        if (nObj) {
            fObj=document.querySelector("#addFam").value;
            let newObj={
                nameObj: nObj,
            famOtv: fObj,
            lesa: [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
            };
            lesa.unshift(newObj);
            updateLesa();
            document.querySelector("#addFam").value="";
            document.querySelector("#addName").value=""
    
        }
           
    
    });
    
    function sumLes(arr){
        let s=0;
        for (let i=0;i<arr.length;i++){
            for(let j=0;j<arr[i].length;j++){
                s+=arr[i][j];
            }
        }
        return s;
    }
    function delObjF(){
        let kol=lesa.length;
        let selDel=document.querySelector("#delObj");
        selDel.innerHTML="";
        for(let i=0;i<lesa.length;i++){
            if(sumLes(lesa[i].lesa)==0){
                let opt =document.createElement("option");
                opt.value=i;
                opt.innerText=lesa[i].nameObj + " - " + lesa[i].famOtv;
                selDel.appendChild(opt);
            }
        }
    }
    let buttDel = document.querySelector(".delObjButt");
    buttDel.addEventListener("click", () => {
             let d=document.querySelector("#delObj").value;
             console.log(d);
             lesa.splice(d,1);
             updateLesa();
             delObjF();
    
    });
    document.querySelector("#objdell").addEventListener("click",()=>{
        dispnone();
        delObjF();
        console.log(document.querySelector(".delObj"));
        document.querySelector(".delObj").style.display="flex";
    });
}

