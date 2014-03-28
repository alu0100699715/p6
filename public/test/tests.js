var assert = chai.assert;

suite('Analizador de PL0 Ampliado Usando PEG.js', function() {
    	test('Probando Statement', function() {
	    prueba = pl0.parse("a = 1*9+4;.")
	    assert.equal(prueba[1].right.type, "+")
	    assert.equal(prueba[1].right.left.type, "*")
	    assert.equal(prueba[1].type, "=")
	    
	});
	
	test('Probando constantes', function() {
	    prueba = pl0.parse("const a=2,b=1;a = 1*9+4;.")
	    assert.equal(prueba[0][0][0].type, "const")
	    assert.equal(prueba[0][0][0].left, "a")
	    assert.equal(prueba[0][0][0].right, "2")
	    assert.equal(prueba[0][0][1].type, "const")
	    assert.equal(prueba[0][0][1].left, "b")
	    assert.equal(prueba[0][0][1].right, "1")
	});
	
	test('Probando variables', function() {
	    prueba = pl0.parse("const a=2,b=1;var a,z;a = 1*9+4;.")
	    assert.equal(prueba[1][0].type, "var")
	    assert.equal(prueba[1][0].id, "a")
	    assert.equal(prueba[1][1].type, "var")
	    assert.equal(prueba[1][1].id, "z")
	});
	
	test('Probando Procedure', function() {
	    prueba = pl0.parse("procedure a(d,f) BEGIN a=12;END a = 1*9+4;.")
	    assert.equal(prueba[1][0].type, "procedure")
	    assert.equal(prueba[1][0].id, "a")
	    
	    assert.equal(prueba[1][1].type, "param")
	    assert.equal(prueba[1][1].id, "d")
	    
	    assert.equal(prueba[1][2].type, "param")
	    assert.equal(prueba[1][2].id, "f")
	    
	    assert.equal(prueba[1][3], undefined)
	
	    
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
}); 