const s=t=>{const r=+String(t).slice(-2);if(r>3&&r<21)return"th";switch(r%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},o=(t,e)=>t.props.date.getFullYear()!==e.props.date.getFullYear()?t.props.date.getFullYear()-e.props.date.getFullYear():t.props.date.getMonth()!==e.props.date.getMonth()?t.props.date.getMonth()-e.props.date.getMonth():t.props.date.getDay()-e.props.date.getDay();function a(t,e){for(const r of t)if(e(r))return r}function i(t,e){const r=[];for(const n of t)e(n)&&r.push(n);return r}function p(t,e){let r=0;for(const n of t){if(n===e)return r;r++}return-1}export{i as a,a as f,p as i,s as n,o as s};