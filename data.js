/* ==========================================================================
   TechFix content (data.js)
   --------------------------------------------------------------------------
   ALL text shown on the site lives in this file. script.js reads it and
   builds the pages, so you rarely need to touch the HTML.

   HOW TO ADD A GUIDE
     Copy any object in GUIDES, paste it at the end of its category, then
     change every field. "id" must be unique; "cat" must be one of:
     "hardware", "software" or "internet".

   GUIDE FIELDS
     id          unique name, also used in links (e.g. software.html#sw-slow)
     cat         which page the guide appears on
     title       heading of the guide
     keywords    extra words people might search for (not shown on screen)
     description one-sentence summary
     causes      list of possible causes
     steps       list of troubleshooting steps, in order
     observe     what to watch for / what to do if the problem persists
     safety      safety warning shown at the bottom of the guide
   ========================================================================== */

const GUIDES = [
  // ----- HARDWARE GUIDES -----

  {
    id: "hw-power",
    cat: "hardware",
    title: "Computer will not turn on",
    keywords: "no power dead wont start black fan",
    description: "Nothing happens when you press the power button.",
    causes: [
      "Power cable or outlet problem",
      "Faulty power strip",
      "Power supply or motherboard fault",
    ],
    steps: [
      "Check that the power cable is firmly seated at both ends.",
      "Plug a different device (like a lamp) into the same outlet to test it.",
      "Try another power strip or a wall outlet.",
      "Check that the power switch on the back of a desktop (if present) is on.",
      "Look for any LED light or fan movement when you press the button.",
    ],
    observe: "If any light or sound appears, the power source is probably working. If still nothing, ask a qualified technician.",
    safety: "Never open the power supply. Unplug the computer before touching any cable inside the case.",
  },
  {
    id: "hw-monitor",
    cat: "hardware",
    title: "Monitor has no display",
    keywords: "no display black screen no signal blank screen monitor",
    description: "The computer seems on, but the screen shows nothing or 'No Signal'.",
    causes: [
      "Loose video cable",
      "Wrong input source selected",
      "Monitor power issue",
      "Graphics or RAM problem",
    ],
    steps: [
      "Check the monitor power light.",
      "Reseat the video cable (HDMI/VGA/DisplayPort) at both ends.",
      "Use the monitor menu to select the correct input source.",
      "Test the monitor with another computer, or another monitor with this computer.",
      "Raise the brightness setting.",
    ],
    observe: "If the monitor works on another computer, the problem is likely in the original computer. If beeps or lights appear, note the pattern for a technician.",
    safety: "Turn off and unplug devices before reconnecting video cables.",
  },
  {
    id: "hw-keyboard",
    cat: "hardware",
    title: "Keyboard is not working",
    keywords: "keyboard keys typing not responding usb",
    description: "Keys do nothing or only some keys respond.",
    causes: [
      "Loose USB cable or dead wireless batteries",
      "Faulty USB port",
      "Spilled liquid or debris",
      "Driver issue",
    ],
    steps: [
      "Check the cable, or replace batteries in a wireless keyboard.",
      "Try a different USB port.",
      "Test the keyboard on another computer.",
      "Gently turn the keyboard upside down and tap to remove debris.",
      "Restart the computer.",
    ],
    observe: "If it works elsewhere, suspect the port or software on the first computer. If it fails everywhere, replace the keyboard.",
    safety: "Do not use water or spray cleaner directly on a keyboard.",
  },
  {
    id: "hw-mouse",
    cat: "hardware",
    title: "Mouse is not working",
    keywords: "mouse cursor pointer not moving click",
    description: "The pointer does not move or buttons do not respond.",
    causes: [
      "Loose cable or dead batteries",
      "Dirty sensor or bad surface",
      "Faulty USB port",
    ],
    steps: [
      "Check the connection or replace the batteries.",
      "Try another USB port.",
      "Try the mouse on a different surface or mouse pad.",
      "Clean the sensor area with a dry, soft cloth.",
      "Test the mouse on another computer.",
    ],
    observe: "A mouse that fails on another computer needs replacement.",
    safety: "Unplug before cleaning. Do not stare into the optical sensor light.",
  },
  {
    id: "hw-printer",
    cat: "hardware",
    title: "Printer is not working",
    keywords: "printer not printing paper jam offline ink toner",
    description: "Print jobs do not print, or the printer shows errors.",
    causes: [
      "Printer off or offline",
      "Paper jam or empty tray",
      "Out of ink or toner",
      "Cable or Wi-Fi connection issue",
      "Stuck print queue",
    ],
    steps: [
      "Check that the printer is on and shows no error light.",
      "Check paper and ink or toner.",
      "Check the USB or network connection.",
      "Cancel stuck jobs in the print queue (Windows: Settings > Printers & scanners).",
      "Restart the printer and computer, then print a test page.",
    ],
    observe: "If a test page prints from the printer itself, the problem is the connection or computer.",
    safety: "Switch off and unplug before removing a paper jam. Do not touch the hot fuser area.",
  },
  {
    id: "hw-heat",
    cat: "hardware",
    title: "Computer overheats",
    keywords: "overheat hot shutdown temperature cooling dust",
    description: "The computer feels very hot or shuts down on its own.",
    causes: [
      "Dust-clogged vents or fans",
      "Blocked airflow",
      "Poor room ventilation",
      "Heavy workload",
    ],
    steps: [
      "Move the computer to an open, hard surface.",
      "Check that vents are not blocked.",
      "Close heavy programs.",
      "Look for dust in the vents (do not open the case if unsure).",
      "Let it cool fully before restarting.",
    ],
    observe: "If shutdowns continue, ask a technician to clean and inspect the cooling system.",
    safety: "Shut down and unplug before any cleaning. Avoid using a vacuum on electronics.",
  },
  {
    id: "hw-fan",
    cat: "hardware",
    title: "Unusual fan noise",
    keywords: "fan noise loud grinding rattling buzzing",
    description: "The fan is louder than usual or makes grinding or rattling sounds.",
    causes: [
      "Dust buildup",
      "Loose cable touching the fan",
      "Worn fan bearing",
      "High temperature workload",
    ],
    steps: [
      "Note when the noise happens (startup, heavy use, always).",
      "Close demanding programs and see if it quiets.",
      "Check that vents are clear.",
      "Listen for rattles from loose items near the computer.",
      "Report grinding sounds to a technician.",
    ],
    observe: "Loud fans during heavy work can be normal. Constant grinding is not.",
    safety: "Never put objects into a running fan.",
  },
  {
    id: "hw-ram",
    cat: "hardware",
    title: "Possible RAM-related startup problems",
    keywords: "ram memory beep beeps startup memory error",
    description: "The computer beeps, restarts, or fails to start after memory was added or moved.",
    causes: [
      "RAM not fully seated",
      "Incompatible or faulty RAM module",
      "Dusty memory slot",
    ],
    steps: [
      "Note any beep pattern or error message.",
      "If you are trained and allowed: shut down, unplug, and ground yourself (ESD precaution) before touching RAM.",
      "Reseat the RAM firmly until the clips click.",
      "Try one module at a time to find a faulty one.",
    ],
    observe: "Beep codes vary by manufacturer, so check the motherboard manual. If unsure, ask a technician.",
    safety: "Discharge static electricity first, hold RAM by its edges, and never open the power supply.",
  },

  // ----- SOFTWARE GUIDES -----

  {
    id: "sw-slow",
    cat: "software",
    title: "Slow computer performance",
    keywords: "slow lag sluggish performance speed running slowly",
    description: "Programs open slowly and the computer feels sluggish.",
    causes: [
      "Too many startup programs",
      "Low storage space or low RAM",
      "Malware",
      "Overheating",
      "Pending updates",
    ],
    steps: [
      "Restart the computer.",
      "Open Task Manager (Windows: Ctrl+Shift+Esc) and look for programs using high CPU or memory.",
      "Close or uninstall programs you do not need.",
      "Check free disk space.",
      "Run Windows Security scan and install updates.",
    ],
    observe: "Faster after a restart means too many background programs. If still slow, a technician can check hardware health.",
    safety: "Windows-specific steps. Do not end programs you do not recognize without checking, and save your work first.",
  },
  {
    id: "sw-crash",
    cat: "software",
    title: "Applications crashing",
    keywords: "app crash closes unexpectedly not responding program error",
    description: "A program closes by itself or stops responding.",
    causes: [
      "Outdated or corrupted app",
      "Not enough memory",
      "Conflict with other software",
      "Corrupted file",
    ],
    steps: [
      "Save work and restart the application.",
      "Check for app updates.",
      "Try opening a different file in the same app.",
      "Restart the computer.",
      "Reinstall the app (back up your files first).",
    ],
    observe: "If only one file crashes, the file is likely damaged. If every file crashes, reinstall.",
    safety: "Reinstalling may remove app settings. Back up important files first.",
  },
  {
    id: "sw-freeze",
    cat: "software",
    title: "Computer freezing",
    keywords: "freeze frozen hang stuck crash unresponsive",
    description: "The screen stops responding to mouse and keyboard.",
    causes: [
      "Overloaded memory",
      "Overheating",
      "Failing storage drive",
      "Driver or software conflict",
    ],
    steps: [
      "Wait one to two minutes; it may recover.",
      "Press Ctrl+Alt+Delete and open Task Manager to close the stuck program (Windows).",
      "Check whether the Caps Lock key light toggles.",
      "If fully frozen, hold the power button about 5 seconds to force shutdown.",
    ],
    observe: "Frequent freezes may mean overheating or storage problems, so seek a technician.",
    safety: "Forced shutdown can lose unsaved work and should be a last resort.",
  },
  {
    id: "sw-install",
    cat: "software",
    title: "Software installation problems",
    keywords: "install installation setup fails cannot install error",
    description: "A program will not install or the installer stops with an error.",
    causes: [
      "Not enough disk space",
      "Incompatible with the operating system",
      "Missing administrator permission",
      "Corrupted download",
    ],
    steps: [
      "Check the program's system requirements.",
      "Check free disk space.",
      "Re-download the installer from the official source.",
      "Right-click the installer and choose Run as administrator (Windows).",
      "Restart and try again.",
    ],
    observe: "If it still fails, note the exact error message and look it up in the vendor's support page.",
    safety: "Only download software from official websites. Avoid cracked or unknown installers.",
  },
  {
    id: "sw-startup",
    cat: "software",
    title: "Startup problems or cannot boot into the operating system",
    keywords: "boot startup windows won't load boot loop operating system stuck logo",
    description: "The computer turns on but does not reach the desktop.",
    causes: [
      "Interrupted update",
      "Corrupted system files",
      "Wrong boot device",
      "Failing drive",
    ],
    steps: [
      "Remove USB drives and discs, then restart.",
      "Note any error message exactly.",
      "Wait: some updates take several minutes.",
      "Windows: after two failed boots, the Recovery Environment may appear; try Startup Repair.",
      "If it does not recover, ask a technician.",
    ],
    observe: "Do not reset or reinstall unless you have backed up your files or a technician advises it.",
    safety: "Reset or reinstall options can delete files. Read the warning screens carefully.",
  },
  {
    id: "sw-storage",
    cat: "software",
    title: "Insufficient storage space",
    keywords: "storage disk full space low drive c",
    description: "The computer reports low disk space.",
    causes: [
      "Large files and downloads",
      "Many installed programs",
      "Temporary files",
    ],
    steps: [
      "Open Settings > System > Storage (Windows) to see what uses space.",
      "Empty the Recycle Bin.",
      "Remove unused programs.",
      "Move large files to an external drive or cloud storage.",
      "Use Storage Sense to remove temporary files.",
    ],
    observe: "Having at least 10-15% free space helps performance.",
    safety: "Check files before deleting. Deleted files may not be recoverable.",
  },
  {
    id: "sw-errors",
    cat: "software",
    title: "Common software error messages",
    keywords: "error message dll blue screen not responding code",
    description: "How to handle error messages.",
    causes: [
      "Missing or damaged files",
      "Permission problems",
      "Driver or update issues",
    ],
    steps: [
      "Write down or photograph the exact message and code.",
      "Restart the computer.",
      "Search the exact code on the official support site of the software maker.",
      "Install pending updates.",
      "Do not click pop-ups that tell you to call a phone number.",
    ],
    observe: "Exact wording helps technicians diagnose faster.",
    safety: "Fake warning pop-ups exist. Close the browser rather than clicking them.",
  },

  // ----- INTERNET GUIDES -----

  {
    id: "net-none",
    cat: "internet",
    title: "No internet connection",
    keywords: "no internet wifi offline not connected network",
    description: "The computer shows no connection or cannot reach any website.",
    causes: [
      "Wi-Fi turned off",
      "Disconnected cable",
      "Router or modem problem",
      "Provider outage",
    ],
    steps: [
      "Check that Wi-Fi is on and airplane mode is off.",
      "Check Ethernet cable at both ends.",
      "Check whether other devices can connect.",
      "Restart the router: unplug for 30 seconds, plug back in, wait 2 minutes.",
      "Contact your internet provider if all devices are offline.",
    ],
    observe: "If only one device fails, the problem is on that device. If all fail, check the router or provider.",
    safety: "Do not share Wi-Fi passwords publicly.",
  },
  {
    id: "net-nobrowse",
    cat: "internet",
    title: "Connected to Wi-Fi but unable to browse",
    keywords: "connected no browse limited access no internet secured",
    description: "The Wi-Fi icon says connected but pages do not load.",
    causes: [
      "Router has no internet",
      "DNS issue",
      "Captive portal login required",
      "Wrong IP settings",
    ],
    steps: [
      "Try several websites.",
      "Open a browser and see if a sign-in page appears.",
      "Test another device on the same Wi-Fi.",
      "Run ping 8.8.8.8 in Command Prompt (Windows).",
      "Restart the router.",
    ],
    observe: "If ping works but websites do not, it is likely DNS.",
    safety: "Do not enter passwords on unexpected pages.",
  },
  {
    id: "net-weak",
    cat: "internet",
    title: "Weak Wi-Fi signal",
    keywords: "weak signal slow wifi range disconnect",
    description: "The signal is low or keeps dropping.",
    causes: [
      "Distance from router",
      "Walls and obstacles",
      "Interference",
      "Too many devices",
    ],
    steps: [
      "Move closer to the router.",
      "Raise the router above the floor, away from metal and thick walls.",
      "Disconnect unused devices.",
      "Try the 5 GHz band if available.",
      "Restart the router.",
    ],
    observe: "If a spot is always weak, a Wi-Fi extender may help.",
    safety: "Keep the router ventilated.",
  },
  {
    id: "net-cable",
    cat: "internet",
    title: "Ethernet cable connection problems",
    keywords: "ethernet lan cable port network cable",
    description: "The wired connection is not working.",
    causes: [
      "Loose or damaged cable",
      "Bad port",
      "Network adapter disabled",
    ],
    steps: [
      "Reseat both ends until they click.",
      "Look for link lights on the port.",
      "Try another cable.",
      "Try another port on the router or switch.",
      "Check that the adapter is enabled in Settings > Network.",
    ],
    observe: "Lit link lights suggest the cable is fine.",
    safety: "Do not bend cables sharply or step on them.",
  },
  {
    id: "net-router",
    cat: "internet",
    title: "Router or modem connectivity issues",
    keywords: "router modem lights restart provider",
    description: "Router or modem lights look wrong or the network is down.",
    causes: [
      "Overheating",
      "Loose cables",
      "Provider outage",
      "Frozen firmware",
    ],
    steps: [
      "Check cables from wall to modem to router.",
      "Look at lights: internet or WAN light off or red may mean provider issue.",
      "Unplug power, wait 30 seconds, plug in.",
      "Wait 2 minutes.",
      "Contact your provider if lights do not recover.",
    ],
    observe: "Meanings of lights differ by model, so check the manual.",
    safety: "Do not open the router or change settings you do not understand.",
  },
  {
    id: "net-dns",
    cat: "internet",
    title: "DNS-related browsing problems",
    keywords: "dns server not found name resolution website not loading",
    description: "Websites fail with DNS errors, yet ping to an IP address works.",
    causes: [
      "DNS server unavailable",
      "Wrong DNS settings",
      "Stale DNS cache",
    ],
    steps: [
      "Run ping 8.8.8.8. If it works, the connection is fine.",
      "Run ping google.com. If it fails, DNS is likely the issue.",
      "Run ipconfig /flushdns (Windows) to clear the cache.",
      "Restart the router.",
      "Ask an adult or teacher before changing DNS settings.",
    ],
    observe: "Replies mean success; 'Request timed out' means no answer.",
    safety: "Only change DNS settings with permission.",
  },
  {
    id: "net-ip",
    cat: "internet",
    title: "Basic IP configuration concepts",
    keywords: "ip address ipconfig gateway subnet dhcp 169.254",
    description: "Understand what an IP address is and how to read ipconfig.",
    causes: [
      "No DHCP address (169.254.x.x)",
      "Wrong gateway",
      "IP conflict",
    ],
    steps: [
      "Open Command Prompt and type ipconfig (Windows).",
      "IPv4 Address is your device's address on the network.",
      "Default Gateway is usually your router.",
      "An address starting with 169.254 means no address was received from the router.",
      "Run ping followed by the gateway address to test the local connection.",
    ],
    observe: "If gateway pings work but the internet does not, the problem is beyond your router.",
    safety: "Do not post screenshots showing your network details publicly.",
  },
];

/* ==========================================================================
   HOME PAGE PROBLEM CARDS
   icon = emoji, title = card text, guideId = the "id" of a guide above.
   ========================================================================== */
const PROBLEM_CARDS = [
  { icon: "⏻", title: "Computer will not turn on", guideId: "hw-power" },
  { icon: "🖥", title: "Monitor has no display", guideId: "hw-monitor" },
  { icon: "🐢", title: "Computer is running slowly", guideId: "sw-slow" },
  { icon: "❄", title: "Freezes or crashes", guideId: "sw-freeze" },
  { icon: "⌨", title: "Keyboard or mouse not working", guideId: "hw-keyboard" },
  { icon: "🖨", title: "Printer is not printing", guideId: "hw-printer" },
  { icon: "📶", title: "No internet connection", guideId: "net-none" },
  { icon: "🔁", title: "Cannot boot into the OS", guideId: "sw-startup" },
];

/* Which page each category lives on (used to build links to guides). */
const PAGE_OF = {
  hardware: "hardware.html",
  software: "software.html",
  internet: "internet.html",
};

/* ==========================================================================
   DIAGNOSTIC WIZARD (decision tree)
   --------------------------------------------------------------------------
   The wizard starts at the node named "start". There are two kinds of node:

   QUESTION node  { question: "...", options: [ { label, next }, ... ] }
       "next" is the name of the node to show after that answer is chosen.

   RESULT node    { isResult: true, title, explanation, guideId }
       "guideId" is the "id" of the guide that the result links to.

   RULES: every "next" must be the name of an existing node, and every
   "guideId" must be the id of an existing guide.
   ========================================================================== */
const TREE = {
  // ----- Questions -----
  start: {
    question: "What problem are you experiencing?",
    options: [
      { label: "Computer will not start or has no display", next: "power" },
      { label: "Computer is slow or freezes", next: "slow" },
      { label: "Internet is not working", next: "net" },
      { label: "Printer, keyboard or mouse", next: "periph" },
      { label: "Computer is very hot or noisy", next: "r_heat" },
    ],
  },
  power: {
    question: "When you press the power button, do any lights or fans come on?",
    options: [
      { label: "No lights and no fans", next: "r_power" },
      { label: "Yes, lights or fans come on", next: "screen" },
      { label: "It beeps or restarts repeatedly", next: "r_ram" },
    ],
  },
  screen: {
    question: "Does the monitor show anything (even a logo or an error)?",
    options: [
      { label: "Nothing at all", next: "r_monitor" },
      { label: "It shows an error message", next: "r_boot" },
      { label: "It starts but stops before the desktop", next: "r_boot" },
    ],
  },
  slow: {
    question: "Is the computer completely frozen (mouse does not move)?",
    options: [
      { label: "Yes, fully frozen", next: "r_freeze" },
      { label: "No, just slow", next: "storage" },
    ],
  },
  storage: {
    question: "Is your disk almost full or do many programs start at startup?",
    options: [
      { label: "Yes or not sure", next: "r_storage" },
      { label: "No", next: "r_slow" },
    ],
  },
  net: {
    question: "Can other devices connect to the same network?",
    options: [
      { label: "No, none can", next: "r_router" },
      { label: "Yes, only this computer fails", next: "r_net" },
      { label: "Connected, but websites will not load", next: "r_dns" },
    ],
  },
  periph: {
    question: "Which device?",
    options: [
      { label: "Printer", next: "r_printer" },
      { label: "Keyboard or mouse", next: "r_kb" },
    ],
  },

  // ----- Results -----
  r_power: {
    isResult: true,
    title: "Possible power source problem",
    explanation: "No lights or fans can point to a power cable, outlet, or power supply issue. This is only a possible cause, not a confirmed diagnosis.",
    guideId: "hw-power",
  },
  r_monitor: {
    isResult: true,
    title: "Possible display connection or input problem",
    explanation: "The computer may be on but the monitor is not receiving a signal.",
    guideId: "hw-monitor",
  },
  r_boot: {
    isResult: true,
    title: "Possible startup or operating system problem",
    explanation: "The hardware seems to start, but something stops the system from loading.",
    guideId: "sw-startup",
  },
  r_freeze: {
    isResult: true,
    title: "Possible overload, overheating, or software conflict",
    explanation: "Freezes often come from memory load, heat, or software.",
    guideId: "sw-freeze",
  },
  r_storage: {
    isResult: true,
    title: "Possible low storage or too many background programs",
    explanation: "A nearly full drive or heavy startup list can slow a computer.",
    guideId: "sw-slow",
  },
  r_slow: {
    isResult: true,
    title: "Cause cannot be narrowed down",
    explanation: "Your answers do not point to one cause. Try the slow-performance guide and consider asking a technician.",
    guideId: "sw-slow",
  },
  r_router: {
    isResult: true,
    title: "Possible router, modem, or provider problem",
    explanation: "If no device can connect, the issue is likely upstream of your computer.",
    guideId: "net-router",
  },
  r_net: {
    isResult: true,
    title: "Possible problem on this computer's connection",
    explanation: "Other devices work, so check Wi-Fi settings, cable, or DNS on this computer.",
    guideId: "net-none",
  },
  r_printer: {
    isResult: true,
    title: "Possible printer connection or supply issue",
    explanation: "Check power, paper, ink and connection.",
    guideId: "hw-printer",
  },
  r_heat: {
    isResult: true,
    title: "Possible cooling or airflow problem",
    explanation: "Heat and fan noise often come from dust or blocked vents.",
    guideId: "hw-heat",
  },
  r_ram: {
    isResult: true,
    title: "Possible memory or startup hardware problem",
    explanation: "Beeps or restart loops can come from memory that is not seated well, or other hardware faults. Beep meanings depend on the manufacturer.",
    guideId: "hw-ram",
  },
  r_dns: {
    isResult: true,
    title: "Possible DNS or sign-in page problem",
    explanation: "A working connection with failing websites often points to DNS or a login page.",
    guideId: "net-dns",
  },
  r_kb: {
    isResult: true,
    title: "Possible loose connection or dead batteries",
    explanation: "Check the cable, batteries and USB port.",
    guideId: "hw-keyboard",
  },
};

/* ==========================================================================
   MAINTENANCE PAGE
   ========================================================================== */

/* Checklist items (each becomes one checkbox). */
const CHECKLIST = [
  "Wipe the screen and keyboard exterior with a dry or slightly damp soft cloth (power off).",
  "Check that vents and fans are free of blockage.",
  "Install operating system and security updates.",
  "Back up important files to a second location.",
  "Delete unneeded files and empty the Recycle Bin.",
  "Shut down the computer properly (do not just hold the power button).",
  "Check cables for damage or looseness.",
];

/* Topic cards shown above the checklist. */
const TOPICS = [
  {
    title: "Safe cleaning",
    text: "Power off and unplug first. Use a dry or slightly damp cloth on outside surfaces. Never spray liquid on or into a computer.",
  },
  {
    title: "Ventilation and cooling",
    text: "Leave space around vents and keep the computer on a hard, flat surface.",
  },
  {
    title: "File organization",
    text: "Use clear folder names and delete files you no longer need.",
  },
  {
    title: "Updates",
    text: "Install system and security updates when prompted.",
  },
  {
    title: "Backups",
    text: "Keep important files in at least two places, such as an external drive plus cloud storage.",
  },
  {
    title: "Handling components",
    text: "Hold parts by their edges and avoid forcing connectors.",
  },
  {
    title: "ESD awareness",
    text: "Static can damage parts. Touch bare metal on the case, or use an anti-static wrist strap, before handling internal parts.",
  },
  {
    title: "Proper shutdown",
    text: "Use Start > Power > Shut down so files are saved and closed properly.",
  },
  {
    title: "When to consult a technician",
    text: "Burning smell, swelling, sparks, liquid spills, repeated crashes, or anything inside the power supply. Never open the power supply.",
  },
];
