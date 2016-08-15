
// generator with Promise

function* asinc(){
		let result=yield new Promise((res, rej)=>{
				setTimeout(()=>{ res("new message")},2000)
			});
		
		yield console.log(result);		
}


function doGen(generator, result){ 
	let next= generator.next(result);  
	if(!next.done==true){
		next.value.then(
			data => {
			//	console.log(data);
				doGen(generator, data)
			},
			err =>  {next.throw(err)}
			)
	}else{
		console.log(next.value)
	}

}

doGen(asinc());

 //   Maybe monad

class Just {
	constructor(value){
		this.value=value
	};

	bind(fn){
	 return	fn(this.value)
	};
	getValue(){
		return this.value
	} 
};

class Nothing {

	bind(_){
		return this
	} 
	getValue(){
		return "Nothing"
	}
}

function doM(generator){

	function step(result){
		let next=generator.next(result);  
		if(!next.done==true){
			return next.value.bind(step)
		}else {
			return next.value
		}

	} 
	return step();
	
} 



console.log(doM(function* (){
	const value = yield new Just(1);
	const value1 = yield new Just(2);
	const value2=yield new Just(3)
	return new Just(value+value1+value2);

}()).getValue());

console.log(doM(function* (){
	const value = yield new Just(1);
	const value1 = yield new Nothing();
	const value2=yield new Just(3)
	return new Just(value+value1+value2);

}()).getValue()); 



// sleep function

function* sleep(delay){
	var time=new Date();
	
	while(new Date()-time<delay){ 	
			yield 
	}
}


function* anotherTask() {
  while (true) {
    yield* sleep(2000);
    console.log('Hello!\n');
  }
}
function* newTask(){
	while(true){
		yield* sleep(3000);
		console.log("hello from another function")
	}
}

let task = anotherTask(); 
let task2=newTask();

function run(){
	task.next()
	task2.next()
	setImmediate(run)
}
run()