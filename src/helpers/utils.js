/*
* Module with useful helper functions
*/

//Provided an array of objects and a numerical property, return max value found
//TODO: Add validation (numerical)
export function maxProperty(arrayOfObjects, property){ 
	if (arrayOfObjects.length === 0){
		return 0
	}
	return Math.max(...arrayOfObjects.map(item => item[property]))
}