<x-filament::page>
<style>
/* SEARCH */
.search-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 25px;
}
.search-input {
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
}
.search-btn {
    background: #b0422e;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
}

/* TREE BASE */
.tree {
    display: flex;
    justify-content: center;
    overflow-x: auto;
    padding: 40px;
}

.tree ul {
    padding-top: 20px;
    position: relative;
    display: flex;
    justify-content: center;
}

.tree li {
    list-style-type: none;
    text-align: center;
    position: relative;
    padding: 20px 30px 0 30px;
}

/* LINES */
.tree li::before, .tree li::after {
    content: '';
    position: absolute;
    top: 0;
    right: 50%;
    border-top: 2px solid #cbd5e1;
    width: 50%;
    height: 20px;
}

.tree li::after {
    right: auto;
    left: 50%;
    border-left: 2px solid #cbd5e1;
}

.tree li:only-child::after,
.tree li:only-child::before {
    display: none;
}

.tree li:only-child {
    padding-top: 0;
}

.tree li:first-child::before,
.tree li:last-child::after {
    border: 0;
}

.tree li:last-child::before {
    border-right: 2px solid #cbd5e1;
    border-radius: 0 5px 0 0;
}

.tree li:first-child::after {
    border-radius: 5px 0 0 0;
}

/* VERTICAL LINE */
.tree ul ul::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    border-left: 2px solid #cbd5e1;
    width: 0;
    height: 20px;
}

/* NODE BOX */
.box {
    width: 65px;
    height: 65px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
}

.active { background: #dcfce7; }
.inactive { background: #fee2e2; }

.label {
    font-size: 11px;
    margin-top: 5px;
}

/* 🔥 POPUP */
.popup {
    position: absolute;
    background: #111;
    color: #fff;
    padding: 12px;
    border-radius: 10px;
    font-size: 12px;
    width: 260px;
    z-index: 9999;
}
</style>

<div class="search-wrap">
    <span class="search-label">Search Associate :</span>
    <input 
        id="userId" 
        class="search-input" 
        placeholder="Enter user ID"
        onkeypress="handleEnter(event)"
    >
    <button onclick="loadTree()" class="search-btn">Search</button>
</div>

<div id="tree" class="tree"></div>

<!-- 🔥 POPUP -->

<div id="popup" class="popup" style="display:none;"></div>

<script>
function isActive(n){ return n && (n.status==1 || n.status=="1"); }

// ================= HOVER SYSTEM =================
// ================= HOVER SYSTEM =================
let hideTimer = null;
let isPopupHovered = false;

function safe(v){ return (v===0||v==="0")?0:(v||0); }

function isActiveMember(node){
    if (!node) return false;
    const status = String(node.status ?? "").toLowerCase();
    return node.status == 1 || status === "1" || status === "active";
}

// SHOW POPUP (ONLY ACTIVE)
function showPopup(node, e) {
    if (!isActiveMember(node)) return; // 🔥 IMPORTANT

    clearTimeout(hideTimer);

    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    let left = e.pageX + 10;
    let top = e.pageY - 260;

    if (left + 260 > window.innerWidth) left -= 270;
    if (top < 10) top = e.pageY + 20;

    popup.style.left = left + 'px';
    popup.style.top = top + 'px';

    // 🔥 FULL DETAILS (same like JSX)
    popup.innerHTML = `
        <b>${node.user_id}</b><br>
        ${node.fullname || '-'}
        <hr>
        Status: ${node.status==1?'Active':'Inactive'}<br>
        Activation: ₹ ${safe(node.activation_amount)}<br>
        Team A | Team B: ${safe(node.team_a)} | ${safe(node.team_b)}<br>
        A PV | B PV: ${safe(node.a_pv)} | ${safe(node.b_pv)}<br>
        A Biz | B Biz: ${safe(node.a_biz)} | ${safe(node.b_biz)}<br>
        A RBV | B RBV: ${safe(node.a_rbv)} | ${safe(node.b_rbv)}<br>
        Self RBV: ${safe(node.self_rbv)}<br>
        Designation: ${node.designation || 'Associate'}<br>
        KYC Status: ${node.kyc_status || 'Unverified'}<br>
        City: ${node.city || '-'}
    `;
}

// HIDE POPUP
function hidePopup() {
    clearTimeout(hideTimer);

    hideTimer = setTimeout(() => {
        if (!isPopupHovered) {
            document.getElementById('popup').style.display = 'none';
        }
    }, 250);
}

// POPUP HOVER (KEEP OPEN)
const popup = document.getElementById('popup');

popup.addEventListener('mouseenter', () => {
    clearTimeout(hideTimer);
    isPopupHovered = true;
});

popup.addEventListener('mouseleave', () => {
    isPopupHovered = false;
    popup.style.display = 'none';
});

// ================= TREE =================

async function loadTree(){
    const input = document.getElementById('userId');
    const id = input.value.trim();

    if (!id) {
        alert("Please enter User ID");
        input.focus();
        return;
    }

    try {
        const treeDiv = document.getElementById('tree');
        treeDiv.innerHTML = `<p style="text-align:center;color:#999;">Loading...</p>`;

        const res = await fetch(`/api/admin/tree?user_id=${id}`);
        const data = await res.json();

        if (!data || !data.tree) {
            treeDiv.innerHTML = `<p style="text-align:center;color:red;">No Tree Found</p>`;
            return;
        }

        treeDiv.innerHTML = '';

        const ul = document.createElement('ul');
        ul.appendChild(renderNode(data.tree));
        treeDiv.appendChild(ul);

    } catch (error) {
        console.error(error);
        document.getElementById('tree').innerHTML =
            `<p style="text-align:center;color:red;">Error loading tree</p>`;
    }
}

function renderNode(node) {
    if (!node) return document.createElement('li');

    const li = document.createElement('li');

    const box = document.createElement('div');
    box.className = 'box ' + (isActive(node) ? 'active' : 'inactive');
    box.innerHTML = '👤';

   if (isActiveMember(node)) {
    box.onmouseenter = (e) => showPopup(node, e);
    box.onmouseleave = hidePopup;
}

    const label = document.createElement('div');
    label.className = 'label';
    label.innerHTML = `<b>${node.user_id}</b><br>${node.fullname || ''}`;

    li.appendChild(box);
    li.appendChild(label);

    if (node.left || node.right) {
        const ul = document.createElement('ul');

        ul.appendChild(renderNode(node.left));
        ul.appendChild(renderNode(node.right));

        li.appendChild(ul);
    }

    return li;
}
</script>

</x-filament::page>
