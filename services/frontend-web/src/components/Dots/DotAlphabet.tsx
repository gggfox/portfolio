const iiiii = [1, 1, 1, 1, 1];
const iiiiz = [1, 1, 1, 1, 0];
//const iiizi = [];
const iiizz = [1, 1, 1, 0, 0];
const iizii = [1, 1, 0, 1, 1];
const iiziz = [1, 1, 0, 1, 0];
const iizzi = [1, 1, 0, 0, 1];
//const iizzz = [];
const iziii = [1, 0, 1, 1, 1];
//const iziiz = [];
const izizi = [1, 0, 1, 0, 1];
//const izizz = [];
const izzii = [1, 0, 0, 1, 1];
const izziz = [1, 0, 0, 1, 0];
const izzzi = [1, 0, 0, 0, 1];
const izzzz = [1, 0, 0, 0, 0];

const ziiii = [0, 1, 1, 1, 1];
const ziiiz = [0, 1, 1, 1, 0];
const ziizi = [0, 1, 1, 0, 1];
const ziizz = [0, 1, 1, 0, 0];
const zizii = [0, 1, 0, 1, 1];
const ziziz = [0, 1, 0, 1, 0];
const zizzi = [0, 1, 0, 0, 1];
const zizzz = [0, 1, 0, 0, 0];
const zziii = [0, 0, 1, 1, 1];
const zziiz = [0, 0, 1, 1, 0];
//zzizi
const zzizz = [0, 0, 1, 0, 0];
//zzzii
const zzziz = [0, 0, 0, 1, 0];
const zzzzi = [0, 0, 0, 0, 1];
const zzzzz = [0, 0, 0, 0, 0];

const lower_a = [zzzzz, iiizz, ziiiz, izziz, ziizi];
const lower_b = [izzzz, izzzz, iiiiz, izzzi, iiiiz];
const lower_c = [zzzzz, ziizz, izziz, izzzz, ziiiz];
const lower_d = [zzizz, zzizz, ziiiz, izzzi, ziiiz];
const lower_e = [zzzzz, zziiz, ziiii, zizzz, zziii];
const lower_f = [zzziz, zzizz, ziiii, zzizz, zzizz];
const lower_g = [zzzzz, zziii, izzzi, ziiiz, iiiii];
const lower_h = [izzzz, izzzz, iiiiz, izzzi, izzzi];
const lower_i = [zzziz, zzzzz, zziiz, zzziz, zzzzi];
const lower_j = [zzzzi, zzzzz, zziii, zzzzi, zziii];
const lower_k = [izzzz, izzzz, izziz, izzzz, izziz];
const lower_l = [ziizz, zzizz, zzizz, zzizz, ziiiz];
const lower_m = [zzzzz, iiziz, izizi, izizi, izizi];
const lower_n = [zzzzz, iizzi, izizi, izzii, izzzi];
const lower_o = [zzzzz, zziiz, zizzi, zizzi, zziiz];
const lower_p = [zzzzz, iiiiz, izzzi, iiiiz, izzzz];
const lower_q = [zzzzz, zziii, izzzi, ziiiz, zzizz];
const lower_r = [zzzzz, ziziz, ziizi, zizzz, zizzz];
const lower_s = [zzzzz, zziii, izzzz, zzzzi, iiiiz];
const lower_t = [zzizz, zzizz, iiizz, zizzz, ziiiz];
const lower_u = [zzzzz, izzzi, izzzi, izzzi, ziiiz];
const lower_v = [zzzzz, izzzi, izzzi, ziziz, zzizz];
const lower_w = [zzzzz, izzzi, izizi, iizii, izzzi];
const lower_x = [zzzzz, zizzi, zziiz, zziiz, zizzi];
const lower_y = [zzzzz, izzzi, izzzi, zizii, ziiiz];
const lower_z = [zzzzz, iiiii, zzizz, zizzz, iiiii];

export const alphabet = new Map([
  ['A', [zzizz, ziziz, izzzi, iiiii, izzzi]],
  ['B', [iiiiz, izzzi, iiiiz, izzzi, iiiiz]],
  ['C', [ziiiz, izzzi, izzzz, izzzi, ziiiz]],
  ['D', [iiiiz, izzzi, izzzi, izzzi, iiiiz]],
  ['E', [iiiii, izzzz, iiiiz, izzzz, iiiii]],
  ['F', [iiiii, izzzz, iiiiz, izzzz, izzzz]],
  ['G', [ziiii, izzzz, iziii, izzzi, ziiiz]],
  ['H', [izzzi, izzzi, iiiii, izzzi, izzzi]],
  ['I', [ziiiz, zzizz, zzizz, zzizz, ziiiz]],
  ['J', [zziii, zzziz, zzziz, izziz, ziizz]],
  ['K', [izzzi, izziz, iiizz, izziz, izzzi]],
  ['L', [izzzz, izzzz, izzzz, izzzz, iiiii]],
  ['M', [izzzi, iizii, izizi, izzzi, izzzi]],
  ['N', [izzzi, iizzi, izizi, izzii, izzzi]],
  ['O', [ziiiz, izzzi, izzzi, izzzi, ziiiz]],
  ['P', [iiiiz, izzzi, iiiiz, izzzz, izzzz]],
  ['Q', [ziiiz, izzzi, izizi, izziz, ziizi]],
  ['R', [iiiiz, izzzi, iiiiz, izziz, izzzi]],
  ['S', [ziiii, izzzz, ziiiz, zzzzi, iiiiz]],
  ['T', [iiiii, zzizz, zzizz, zzizz, zzizz]],
  ['U', [izzzi, izzzi, izzzi, izzzi, ziiiz]],
  ['V', [izzzi, izzzi, izzzi, ziziz, zzizz]],
  ['W', [izzzi, izzzi, izizi, iizii, izzzi]],
  ['X', [izzzi, ziziz, zzizz, ziziz, izzzi]],
  ['Y', [izzzi, ziziz, zzizz, zzizz, zzizz]],
  ['Z', [iiiii, zzziz, zzizz, zizzz, iiiii]],
  [' ', [zzzzz, zzzzz, zzzzz, zzzzz, zzzzz]],
  // Lowercase letters
  ['a', lower_a],
  ['b', lower_b],
  ['c', lower_c],
  ['d', lower_d],
  ['e', lower_e],
  ['f', lower_f],
  ['g', lower_g],
  ['h', lower_h],
  ['i', lower_i],
  ['j', lower_j],
  ['k', lower_k],
  ['l', lower_l],
  ['m', lower_m],
  ['n', lower_n],
  ['o', lower_o],
  ['p', lower_p],
  ['q', lower_q],
  ['r', lower_r],
  ['s', lower_s],
  ['t', lower_t],
  ['u', lower_u],
  ['v', lower_v],
  ['w', lower_w],
  ['x', lower_x],
  ['y', lower_y],
  ['z', lower_z],
]);
