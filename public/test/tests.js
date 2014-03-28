var assert = chai.assert;

suite('Analizador de PL0 Ampliado Usando PEG.js', function() {
    	test('Probando Statement', function() {
	    prueba = pl0.parse("a = 1*9+4;.")
	    assert.equal(prueba[0].right.type, "+")
	    assert.equal(prueba[0].right.left.type, "*")
	    assert.equal(prueba[0].type, "=")
	    
	});
	
// 	test('Probando tokens', function() {
// 		var exp = "c = 5"
// 		var res = '[{"type":"ID","value":"c","from":0,"to":1},{"type":"=","value":"=","from":2,"to":3},{"type":"NUM","value":5,"from":4,"to":5}]'
// 		var fun = JSON.stringify(exp.tokens())
// 		assert.equal(fun, res)
// 	});
// 	test('Probando parse', function() {
// 		var exp = "a = 2+1"
// 		var res = '{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"+","left":{"type":"NUM","value":2},"right":{"type":"NUM","value":1}}}'
// 		var fun = JSON.stringify(window.parse(exp))
// 		assert.equal(fun, res)
// 	});
// 	test('Probando fallo en tokens', function() {
// 		var exp = "#hola#"
// // 		var res = "Syntax error near '#hola#'"
// 		chai.expect(function () { exp.tokens() }).to.throw(res);
// 	});
// 	test('Probando fallo en parse', function() {
// 		var exp = "hello world"
// 		var res = "Syntax Error. Expected = found \'world\' near \'world\'"
// 		chai.expect(function () { window.parse(exp) }).to.throw(res);
// 	});
// }); 