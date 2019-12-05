const a = :start;
const b = :foo_baz;
const c = true ? 1 : 2;
const d = { [:mykey]: true };
const e = true ? :abc : :def;
const f = :a

class A {
  [:foo] () { console.log('foo') }
}