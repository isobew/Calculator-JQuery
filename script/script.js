$(document).ready(function () {
    class Calculator {

        operand1;
        operand2;
        operation;

        setOperand1(_operand1) {
            this.operand1 = _operand1
        }

        setOperand2(_operand2) {
            this.operand2 = _operand2
        }

        setOperation(_operation) {
            this.operation = _operation
        }

        getOperand1() {
            return this.operand1
        }

        getOperand2() {
            return this.operand2
        }

        getResult() {
            if (this.operation == "+") {
                $('#screen').val(Number(this.operand1) + Number(this.operand2));
            }
            else if (this.operation == "-") {
                $('#screen').val(this.operand1 - this.operand2)
            }
            else if (this.operation == "x") {
                $('#screen').val(this.operand1 * this.operand2)
            }
            else if (this.operation == "/") {
                if (this.operand2 == "0") {
                    $('#screen').val("error")
                } else {
                    if ((this.operand1 % this.operand2) == 0) {
                        $('#screen').val(this.operand1 / this.operand2)
                    } else {
                        $('#screen').val(this.operand1 / this.operand2).toFixed(3)
                    }
                }

            }
        }

        clearCalculator() {
            this.setOperand1()
            this.setOperand2()
            this.setOperation()
            $("#screen").val("");
            $('#operator').html("");
            $('#mensagem_erro').html("");
        }
    }

    const calc = new Calculator()


    // ---------------------------------------------------------------------------------------------------------------------------------------//


    //função que vai concatenar o valor do número clicado ao valor que está na tela
    $('input[name=btn]').on('click', function () {
            $("#screen").val($("#screen").val() + $(this).val());

            if($('#screen').val(calc.getResult())){
                $('#screen').val($(this).val())
            }
        
    })

    //função para limpar a tela
    $('#clear').on('click', function () {
        calc.clearCalculator()
    })

    //função para excluir o último valor
    $('#back').on('click', function () {
        const result = $("#screen").val();
        $("#screen").val(result.substring(0, result.length - 1));
    })

    //função para pegar o valor do operador, denomina o primeiro valor em tipo numérico, denomina o this.operation como o value do input clicado
    //mostra o sinal com o primeiro valor e remove o primeiro valor do display pra receber o segundo
    $("input[name=operators]").on('click', function () {
        if ($("#screen").val() != '') {
            const operator = $(this).attr("value");
            calc.setOperand1(Number($("#screen").val()));
            calc.setOperation(operator);
            $('#operator').html(calc.getOperand1() + operator);
            $("#screen").val("");
        } else {
            $('#mensagem_erro').html("Insira um valor para ser calculado")
        }
    });


    // função para realizar o cálculo executando o getResult da classe e mostrando na tela
    $("#equal").on('click', function () {
        calc.setOperand2(Number($("#screen").val()));
        if ($("#screen").val() != '') {
            $('#operator').html('=');
            calc.getResult();

        } else {
                $('#mensagem_erro').html("Insira um valor para ser calculado");
                //.fadeOut(3000);
        }
    });


});
