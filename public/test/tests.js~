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
	    
	    assert.equal(prueba[1][3].type, undefined) // porque no hay constantes no varianbles dentro del procedure.
	    
	    assert.equal(prueba[1][4].type, "=")
	    assert.equal(prueba[1][4].right, "12")
	    assert.equal(prueba[1][4].left, "a")
	    
	    assert.equal(prueba[2].type,"=")
	    assert.equal(prueba[2].left,"a")
      });
	
      test('Probando WHILE y condition', function() {
	    prueba = pl0.parse("while a < 9 do b=9;.")
	    assert.equal(prueba[1].type, "WHILE")
	    	    
	    assert.equal(prueba[1].condition.type, "<")
	    assert.equal(prueba[1].condition.left, "a")
   	    assert.equal(prueba[1].condition.right, "9")
	    
	    assert.equal(prueba[1].statement.type, "=")
	    assert.equal(prueba[1].statement.left, "b")
	    assert.equal(prueba[1].statement.right, "9")
     });
      
      test('Probando IF y condition', function() {
	    prueba = pl0.parse("if a < 9 then b=9;.")
	    assert.equal(prueba[1].type, "IF")
	    	    
	    assert.equal(prueba[1].condition.type, "<")
	    assert.equal(prueba[1].condition.left, "a")
   	    assert.equal(prueba[1].condition.right, "9")
	    
	    assert.equal(prueba[1].statement.type, "=")
	    assert.equal(prueba[1].statement.left, "b")
	    assert.equal(prueba[1].statement.right, "9")
     });
      
     test('Probando IF ELSE y condition', function() {
	    prueba = pl0.parse("if a < 9 then b=9 else b=5;.")
	    assert.equal(prueba[1].type, "IFELSE")
	    	    
	    assert.equal(prueba[1].condition.type, "<")
	    assert.equal(prueba[1].condition.left, "a")
   	    assert.equal(prueba[1].condition.right, "9")
	    
	    assert.equal(prueba[1].true_statement.type, "=")
	    assert.equal(prueba[1].true_statement.left, "b")
	    assert.equal(prueba[1].true_statement.right, "9")
	    
	    assert.equal(prueba[1].else_statement.type, "=")
	    assert.equal(prueba[1].else_statement.left, "b")
	    assert.equal(prueba[1].else_statement.right, "5")
     }); 
      
}); 