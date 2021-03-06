/*
 * Classic example grammar, which recognizes simple arithmetic expressions like
 * "2*(3+4)". The parser generated from this grammar then AST.
 */

{
  var tree = function(f, r) {
    if (r.length > 0) {
      var last = r.pop();
      var result = {
        type:  last[0],
        left: tree(f, r),
        right: last[1]
      };
    }
    else {
      var result = f;
    }
    return result;
  }
}

prog = c:block "."_ {return c}

block =_ i:bloques_const* j:bloques_var* z:bloques_proc* _ c:bloques_st {return (([i].concat(j)).concat(z)).concat(c);}

//st block
bloques_st = i:st j:otrast* ";"_ {return [i].concat(j);}
otrast = ";" _ i:st {return i;}

//constantes.
bloques_const = i:constante j:otracostante* ";"_ {return [i].concat(j);}
constante = _"const" i:ID "=" n:NUMBER {return {type: "const", left:i, right:n};}
otracostante = "," _ i:ID "=" n:NUMBER {return {type: "const", left:i, right:n};}

//variables.
bloques_var = _ i:var j:otro_var* ";"_ {return [i].concat(j);}
otro_var = "," j:ID {return {type:"var",id:j};}
var = "var" i:ID {return {type:"var",id:i};}

//procedimiento

bloques_proc = i:proc j:proc_parametros? BEGIN z:block END{return ([i].concat(j)).concat(z);}
proc = _"procedure" j:ID {return {type:"procedure",id:j};}
proc_parametros = LEFTPAR i:un_para j:otro_para* RIGHTPAR {return [i].concat(j);}
un_para = i:ID {return {type: "param", id:i};}
otro_para = _"," j:ID {return {type: "param", id:j};}


st     = i:ID ASSIGN e:exp { return {type: '=', left: i, right: e}; }
	/ CALL e:ID s:proc_parametros? {return s? { type: 'CALL', arg:s, value:e}:{ type: 'CALL',value:e};}
       / IF e:cond THEN st:st ELSE sf:st { return {type:'IFELSE', condition: e, true_statement: st, else_statement: sf}; }
       / IF e:cond THEN s:st { return {type:'IF', condition: e, statement: s}; }
       / WHILE e:cond DO s:st { return {type:'WHILE', condition: e, statement: s}; }
	
       
       
cond   = c:factor op:COMPARISON? e:exp? { return {type: op, left: c, right: e}; }
exp    = t:term   r:(ADD term)*   { return tree(t,r); }
term   = f:factor r:(MUL factor)* { return tree(f,r); }

factor = NUMBER
       / ID
       / LEFTPAR t:exp RIGHTPAR   { return t; }

_ = $[ \t\n\r]*

COMPARISON = _ op:$([<>=!]"=")_ { return op; }
             / _ op:[<>] _ { return op; } 
	     / _ factor:factor _ {return factor;}
ASSIGN   = _ op:'=' _  { return op; }
ADD      = _ op:[+-] _ { return op; }
MUL      = _ op:[*/] _ { return op; }
CALL     = _"call"_
BEGIN	 = _"BEGIN"_
END     = _"END"_
LEFTPAR  = _"("_
RIGHTPAR = _")"_
IF       = _ "if" _
THEN     = _ "then" _
ELSE     = _ "else" _
WHILE    = _ "while" _
DO       = _ "do" _
ID       = _ id:$[a-zA-Z_][a-zA-Z_0-9]* _ { return id; }
NUMBER   = _ digits:$[0-9]+ _ { return parseInt(digits, 10); }
