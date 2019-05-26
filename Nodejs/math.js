const Math={}
function add(x1,x2){
return x1+x2;
}
function substract(x1,x2){
return x1-x2;
}
function multiply(x1,x2){
return x1*x2;
}
function divide(x1,x2){
	if(x2==0){
	console.log('la division tiende a infinito');
	}
	else
	{
	return x1/x2;
	}
}
Math.add=add;

Math.substract=substract;

Math.divide=divide;

Math.multiply=multiply;

module.exports=Math;/*permite exportar  obj, funciones y cualquier dato de JS*/
/*
exports.add=add;
exports.substract=substract;
exports.multiply=multiply;
exports.divide=divide;
*/