const dialogs = [...document.querySelectorAll('.feature-modal')];

document.querySelectorAll('[data-open]').forEach((card) => {
  card.addEventListener('click', () => document.getElementById(card.dataset.open).showModal());
});
document.querySelectorAll('.modal-close').forEach((button) => {
  button.addEventListener('click', () => button.closest('dialog').close());
});
dialogs.forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});

// SMS workflow preview: no carrier message or contractor request is sent.
const chatWindow = document.querySelector('#chat-window');
const triggerMaintenance = document.querySelector('#trigger-maintenance');
triggerMaintenance.addEventListener('click', () => {
  if (triggerMaintenance.disabled) return;
  triggerMaintenance.disabled = true;
  document.querySelector('.chat-placeholder')?.remove();
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble chat-user';
  userBubble.textContent = 'Garage door jammed.';
  chatWindow.append(userBubble);
  window.setTimeout(() => {
    const response = document.createElement('div');
    response.className = 'chat-bubble chat-system';
    response.innerHTML = 'Logged. Locksmith quote found: $150. Sinking Fund: $14,200. Reply YES to prepare a work order.<small>Workflow preview · no API or messaging service is contacted.</small><div class="chat-actions"><button type="button" data-vote="yes">YES</button><button type="button" data-vote="no">NO</button></div>';
    chatWindow.append(response);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    response.querySelector('[data-vote="yes"]').addEventListener('click', () => {
      response.querySelector('.chat-actions').remove();
      const outcome = document.createElement('div');
      outcome.className = 'chat-confirm';
      outcome.textContent = 'Work order WO-204 is prepared for Harbour Locksmith. No contractor was contacted.';
      chatWindow.append(outcome);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    });
    response.querySelector('[data-vote="no"]').addEventListener('click', () => {
      response.querySelector('.chat-actions').remove();
      const outcome = document.createElement('div');
      outcome.className = 'chat-confirm';
      outcome.textContent = 'Request held for committee review. No work order was sent.';
      chatWindow.append(outcome);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    });
  }, 800);
}, { once: true });

// Three-record reconciliation visualization; it never posts a ledger entry.
const reconcileLedger = document.querySelector('#reconcile-ledger');
const ledgerFlow = document.querySelector('#ledger-flow');
reconcileLedger.addEventListener('click', () => {
  if (reconcileLedger.disabled) return;
  reconcileLedger.disabled = true;
  reconcileLedger.innerHTML = 'Matching the three records <span>…</span>';
  ledgerFlow.classList.add('reconciling');
  const nodes = [...ledgerFlow.querySelectorAll('.ledger-node')];
  nodes.forEach((node, index) => window.setTimeout(() => {
    node.classList.add('verified');
    node.querySelector('i').textContent = 'MATCH VERIFIED';
  }, 180 + index * 180));
  const started = performance.now();
  const duration = 850;
  function countBalance(now) {
    const amount = Math.round(14200 - 150 * Math.min((now - started) / duration, 1));
    document.querySelector('#fund-balance').textContent = `$${amount.toLocaleString('en-AU')}`;
    if (now - started < duration) requestAnimationFrame(countBalance);
  }
  requestAnimationFrame(countBalance);
  window.setTimeout(() => {
    ledgerFlow.classList.add('matched');
    reconcileLedger.innerHTML = 'Match preview complete <span>✓</span>';
    document.querySelector('#ledger-note').textContent = 'Double-entry accounting flow previewed. No ledger entry was posted.';
  }, duration);
}, { once: true });

// Hold for 1.5 seconds to animate a document-pack preview; nothing is filed.
const holdQuery = document.querySelector('#hold-query');
const radialRing = document.querySelector('#radial-ring');
const vaultResult = document.querySelector('#vault-result');
const vaultTime = document.querySelector('#vault-time');
const vaultFee = document.querySelector('#vault-fee');
let holdStartedAt = 0;
let holdFrame = 0;
let holdFinished = false;
function cancelVectorHold() {
  if (!holdStartedAt || holdFinished) return;
  cancelAnimationFrame(holdFrame);
  holdStartedAt = 0;
  radialRing.classList.remove('running');
  radialRing.style.setProperty('--progress', '0%');
  holdQuery.classList.remove('is-holding');
  vaultTime.textContent = '0.0s';
}
function startVectorHold(event) {
  if (holdFinished || holdStartedAt) return;
  event.preventDefault();
  holdStartedAt = performance.now();
  radialRing.classList.add('running');
  holdQuery.classList.add('is-holding');
  if (event.pointerId !== undefined && holdQuery.setPointerCapture) holdQuery.setPointerCapture(event.pointerId);
  const tick = (now) => {
    const elapsed = now - holdStartedAt;
    const pct = Math.min(elapsed / 1500, 1);
    radialRing.style.setProperty('--progress', `${pct * 100}%`);
    vaultTime.textContent = `${(Math.min(elapsed, 1500) / 1000).toFixed(1)}s`;
    if (pct >= 1) finishVectorQuery();
    else holdFrame = requestAnimationFrame(tick);
  };
  holdFrame = requestAnimationFrame(tick);
}
function finishVectorQuery() {
  if (holdFinished) return;
  holdFinished = true;
  holdStartedAt = 0;
  radialRing.classList.remove('running');
  radialRing.classList.add('complete');
  holdQuery.classList.remove('is-holding');
  holdQuery.disabled = true;
  document.querySelector('.hold-caption').innerHTML = 'QUERY COMPLETE<br />PREVIEW READY';
  vaultTime.textContent = '1.5s';
  vaultFee.textContent = '$0.00';
  vaultFee.classList.add('free');
  vaultResult.classList.add('visible');
  if (typeof navigator.vibrate === 'function') navigator.vibrate(55);
}
holdQuery.addEventListener('pointerdown', startVectorHold);
holdQuery.addEventListener('pointerup', cancelVectorHold);
holdQuery.addEventListener('pointercancel', cancelVectorHold);
holdQuery.addEventListener('lostpointercapture', cancelVectorHold);
holdQuery.addEventListener('keydown', (event) => {
  if ((event.code === 'Space' || event.code === 'Enter') && !event.repeat) startVectorHold(event);
});
holdQuery.addEventListener('keyup', (event) => {
  if (event.code === 'Space' || event.code === 'Enter') cancelVectorHold();
});

// Owner vote visualization uses a staged sample sequence and records no votes.
const dispatchPolls = document.querySelector('#dispatch-polls');
const quorumProgress = document.querySelector('#quorum-progress');
const quorumPercent = document.querySelector('#quorum-percent');
const quorumMessage = document.querySelector('#quorum-message');
const ringCircumference = 2 * Math.PI * 112;
const voteMessages = ['Owner 04: Yes', 'Owner 08: Yes', 'Owner 02: Yes', 'Owner 09: Yes', 'Owner 01: Yes', 'Owner 06: Yes'];
dispatchPolls.addEventListener('click', () => {
  if (dispatchPolls.disabled) return;
  dispatchPolls.disabled = true;
  dispatchPolls.innerHTML = 'Animating sample responses <span>…</span>';
  const incoming = document.querySelector('#incoming-votes');
  voteMessages.forEach((message, index) => {
    window.setTimeout(() => {
      const toast = document.createElement('span');
      toast.className = 'vote-toast';
      toast.textContent = message;
      incoming.append(toast);
    }, index * 230);
  });
  [{ value: 10, at: 220 }, { value: 35, at: 670 }, { value: 51, at: 1120 }, { value: 60, at: 1630 }].forEach(({ value, at }) => {
    window.setTimeout(() => {
      quorumProgress.style.strokeDashoffset = String(ringCircumference * (1 - value / 100));
      quorumPercent.textContent = `${value}%`;
      if (value >= 51) {
        document.querySelector('.quorum-ring').classList.add('reached');
        quorumMessage.textContent = 'QUORUM REACHED';
        document.querySelector('#fees-counter').textContent = '$250';
        document.querySelector('#fees-counter').classList.add('market-saved');
      }
      if (value === 60) dispatchPolls.innerHTML = 'Sample sequence complete <span>✓</span>';
    }, at);
  });
}, { once: true });


