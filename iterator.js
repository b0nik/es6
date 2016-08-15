class Range{
	constructor(start,end,step=1){
		this.start=start;
		this.end=end;
		this.step=step;
	}
	
	[Symbol.iterator](){
		const {start, end, step}=this;
		let current=start; 
		
		if (step <=0) {
   			 throw new Error('illegal step');
  		}
  		
		return{ 
		
			next(){   
				if (current<=end){  
					let value=current;
					current+=step; 
					return{value:value, done: false}
				} else{
					return { value: undefined, done: true };
				}
			}
		}
	}	
};

console.log([...new Range(-5,5,3)])