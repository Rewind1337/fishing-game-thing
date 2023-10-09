function format(input, seperator = ".", digitsBelowAThousand = 0){
	let suffix = ["", "K", "M", "B", "T", 
	"Aa", "Ab", "Ac", "Ad", "Ae", "Af", "Ag", "Ah", "Ai", "Aj", "Ak", "Al", "Am", "An", "Ao", "Ap", "Aq", "Ar", "As", "At", "Au", "Av", "Aw", "Ax", "Ay", "Az", 
	"Ba", "Bb", "Bc", "Bd", "Be", "Bf", "Bg", "Bh", "Bi", "Bj", "Bk", "Bl", "Bm", "Bn", "Bo", "Bp", "Bq", "Br", "Bs", "Bt", "Bu", "Bv", "Bw", "Bx", "By", "Bz", 
	"Ca", "Cb", "Cc", "Cd", "Ce", "Cf", "Cg", "Ch", "Ci", "Cj", "Ck", "Cl", "Cm", "Cn", "Co", "Cp", "Cq", "Cr", "Cs", "Ct", "Cu", "Cv", "Cw", "Cx", "Cy", "Cz", 
	"Da", "Db", "Dc", "Dd", "De", "Df", "Dg", "Dh", "Di", "Dj", "Dk", "Dl", "Dm", "Dn", "Do", "Dp", "Dq", "Dr", "Ds"];
	let logResult = Math.floor(Math.log10(input) / 3);
	if (input <= 0) {return 0;}
	if (input < 1000 && input > 0) 
	{
		if (digitsBelowAThousand > 0)
			return input.toFixed(digitsBelowAThousand);
		else
			return Math.floor(input);
	}
	// let offset = Math.floor(Math.log10(input)) % 3;
	let preComma = Math.floor(input / Math.pow(1000, logResult));
	let postComma = Math.floor(input / Math.pow(1000, logResult-1)) - 1000 * (preComma - 1);
	return preComma.toString() + seperator + postComma.toString().substr(1) + " " + suffix[logResult];
}

export default format;