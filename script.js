const divWindowStart = document.querySelector('#divWindowStart');
const divWindownAfterSimulation = document.querySelector('#divWindownAfterSimulation');
const divErro = document.querySelector('#erro');
const pegaValor = document.querySelector('#onClick')


function responseJSON(response){
  return response.json();
}

function showInTheWindow(name, monthlyPayment, time, interestRate){

  const inputname = document.querySelector('#name');
  const inputmonthlyPayment = document.querySelector('#monthlyPayment');
  const inputTime = document.querySelector('#time');
  const inputInterestRate = document.querySelector('#interestRate');

  name = inputname.value;
  monthlyPayment = inputmonthlyPayment.value;
  time = inputTime.value;
  interestRate = inputInterestRate.value;
  
 
    if (name == null || name == ''){
        showError()
        setTimeout(() => {
          divErro.classList.add('erroHidden');
          divWindowStart.classList.remove('hidden');
        }, 3000);
        
    } else if(monthlyPayment == null || monthlyPayment == ''){
      showError()
      setTimeout(() => {
        divErro.classList.add('erroHidden');
        divWindowStart.classList.remove('hidden');
      }, 3000);

    } else if (time == null || time == '') {
      showError()
      setTimeout(() => {
        divErro.classList.add('erroHidden');
        divWindowStart.classList.remove('hidden');
      }, 3000);

    } else if (interestRate == null || interestRate == '') {
      showError()
      setTimeout(() => {
        divErro.classList.add('erroHidden');
        divWindowStart.classList.remove('hidden');
      }, 3000);

    }
    else{
      divErro.classList.add('erroHidden');
      divWindownAfterSimulation.classList.remove('hidden');
      divWindownAfterSimulation.innerHTML = `Hey ${name}, investing $${monthlyPayment
        } every month, you will have $${(time * 12 )* monthlyPayment} in ${time} ${time <= 1 ? 'Year' : 'Years'} `;
      divWindowStart.classList.add('erroHidden')
      divWindownAfterSimulation.innerHTML += `
         <button style="margin-top: 20px;" id="onClick" onclick="back()" type="submit"> Simulation Again</button>
      `
      
    }
  
 
}
function back() {
  location.reload()
}


function showError(){
  divWindownAfterSimulation.classList.add('hidden');
  divWindowStart.classList.add('hidden');
  divErro.classList.remove('erroHidden');
}

const apiFetch = (name, monthlyPayment, time, interestRate) => {
  const expr = {
    expr: `${monthlyPayment} * (((1 + ${interestRate}) ^ ${time * 12} - 1) / ${interestRate})`,
    precision: 2
  }
  const configs = {
    method: 'POST',
    headers: { "content-type": "application/json" },
    body: [JSON.stringify(expr)]
  }
  fetch(`http://api.mathjs.org/v4/`, configs)
    .then(responseJSON)
    .then(showInTheWindow)
    .catch(showError)

}


