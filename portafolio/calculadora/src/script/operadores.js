class operadores{
    suma(num1, num2){
        return num1 + num2 
    }
    resta(num1, num2){
        return num1 - num2    
    }
    multiplicacion(num1, num2){
        return num1 * num2    
    }
    division(num1, num2){
        if (num2 === 0){
            return "El numero no puede ser 0"
        }
        return num1 / num2
    }
}
export const Operadores = new operadores();