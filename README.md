# Spese — tracker personale

Web app per iPhone: spese, entrate e mance. Funziona offline e i dati restano **solo sul telefono** (IndexedDB). Nessun server, nessun account.

File dell'app: `index.html`, `manifest.json`, `sw.js`, `icon-180.png`, `icon-192.png`, `icon-512.png`.

---

## 1. Pubblicare su GitHub Pages

1. Accedi a [github.com](https://github.com) (crea un account gratuito se non ce l'hai).
2. In alto a destra **+ → New repository**. Nome: ad es. `spese`. Visibilità: **Public** (con l'account gratuito GitHub Pages funziona solo sui repository pubblici; il codice è visibile, i tuoi dati no). Premi **Create repository**.
3. Nella pagina del repository vuoto clicca **uploading an existing file**. Trascina i 6 file dell'app (i file, non la cartella; il README è facoltativo) e premi **Commit changes**.
4. Vai su **Settings → Pages**. In *Build and deployment*: Source **Deploy from a branch**, Branch **main**, cartella **/ (root)** → **Save**.
5. Dopo 1–2 minuti in cima alla stessa pagina compare l'indirizzo, del tipo `https://TUO-UTENTE.github.io/spese/`.

## 2. Aggiungere l'app alla schermata Home

1. Sull'iPhone apri l'indirizzo con **Safari**.
2. Aspetta che la pagina sia caricata del tutto: al primo avvio con internet l'app salva in cache anche il lettore Excel, così poi l'import funziona offline.
3. Tocca **Condividi** (il quadrato con la freccia) → **Aggiungi alla schermata Home**. Se compare l'opzione *Apri come web app*, lasciala attiva. Poi **Aggiungi**.
4. Da qui in poi apri l'app **solo dall'icona**: la versione nella Home ha una memoria separata da quella di Safari.

## 3. Primo utilizzo

1. **Impostazioni → Saldi iniziali**: inserisci saldo del conto e contanti. Con la data "dal giorno" il saldo parte da quel giorno e conta solo i movimenti successivi (utile se importi anche movimenti più vecchi).
2. **Importa**: scegli l'Excel scaricato da Intesa Sanpaolo. Vanno bene sia la *lista movimenti della carta* sia l'*export dei movimenti del conto*. Lo stipendio e i bonifici ci sono solo nell'export del conto.
3. Nella revisione tocca la categoria: salva e passa al movimento successivo. Con **Ricorda per…** attivo il negozio viene salvato nella categoria: gli altri movimenti dello stesso negozio (anche nello stesso file) vengono assegnati da soli.
4. Imposta abbonamenti e telefono in **Impostazioni → Spese ricorrenti**.
5. Fai il backup da **Impostazioni → Esporta backup** e salvalo in *File → iCloud Drive*. Di domenica l'app te lo ricorda se l'ultimo ha più di 7 giorni.

## Come funziona (dettagli utili)

- **Doppioni**: puoi reimportare lo stesso periodo, o lo stesso periodo in formato carta e conto: i movimenti già presenti vengono saltati. Anche le spese con carta che hai inserito a mano vengono riconosciute (stesso importo, data entro 3 giorni) e collegate, senza contarle due volte.
- **Ricorrenti**: vengono aggiunte ogni mese nel giorno scelto. Se poi arrivano dall'import (descrizione che contiene il nome o la parola chiave, importo simile, data entro 10 giorni), vengono collegate e non raddoppiano.
- **Prelievo**: sposta soldi dal conto ai contanti, non è né spesa né entrata. Il versamento di contanti fa l'opposto.
- **Ignora**: per i bonifici tra i tuoi conti. Non conta come spesa o entrata ma aggiorna il saldo del conto. I bonifici verso o da il tuo nome (Impostazioni → Il tuo nome, compilato da solo dal primo Excel) vengono proposti come Ignora.
- **Chiedi sempre**: i nomi segnati così (preimpostati: Amazon, PayPal) non vengono mai assegnati in automatico. Vince comunque il nome più lungo: se hai salvato "Disney+", un pagamento "PAYPAL *DISNEYPLUS" viene assegnato da solo.
- **Mance**: un totale al giorno. Si sommano alle entrate del mese e, se l'opzione è attiva, al saldo contanti.
- **Colonne**: se un file non viene riconosciuto, l'app ti fa associare le colonne a mano e ricorda l'associazione per i file con la stessa intestazione.

## Aggiornare l'app

1. Sostituisci i file su GitHub (**Add file → Upload files**).
2. In `sw.js` cambia `VERSION` (es. da `spese-v1.0.0` a `spese-v1.0.1`), altrimenti l'iPhone può continuare a usare i file vecchi.
3. Apri l'app con internet, chiudila e riaprila.

I dati non si perdono con gli aggiornamenti. Si perdono se elimini l'icona dalla Home o cancelli i dati del sito: per questo serve il backup.
