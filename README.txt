ALIREZA MONTAJAB — PERSONAL WEBSITE
====================================
Complete. cv.pdf is included. No placeholders.


WHAT THIS UPDATE ADDED (from your CV)
-------------------------------------
- Research Interests section on the About page. This is the single
  most important section for a graduate application and the site
  did not have it.
- Honors & Awards section: Full Tuition Scholarship 2023-2027 and
  top 1% Konkur rank. Neither was anywhere on the site before.
- QS ranking line under Education (#741-750 worldwide, #214 Asia).
- LinkedIn card on Contact and a LinkedIn button on the home page.
- DMA, finite state machines, BOM sourcing and logic analyser added
  to the skills rows.
- Barcode terminal: the Altium carrier PCB you designed.
- RFID board: the antenna and clock/data interfaces, and the serial
  capture firmware you wrote for bring-up.
- Teaching assistant: office hours.
- cv.pdf added, so every Download CV button now works.


ONE CHANGE YOU MUST CONFIRM
---------------------------
Major GPA is now shown as 16.00/20 on the site, matching your CV.

It previously showed 17.70/20 because that is the figure you gave
me verbally. Three separate versions of your CV all say 16.00, so
the site has been changed to agree with the document you will
actually submit.

If 17.70 is the correct figure, fix it in TWO places:
    index.html   search for 16.00
    about.html   search for 16.00
and correct your CV as well. The two must never disagree.


STILL TO FIX IN THE CV ITSELF (not the site)
--------------------------------------------
Page 1 of your CV still contains two placeholders:
    Senior Design Project ... [topic], supervised by Dr. [name]
Fill these in or delete the line before you submit anything.


FIXED IN THIS BUILD
------------------
The Contact page had an unclosed HTML comment. Everything after the
Email and CV cards - GitHub, LinkedIn, the Location section and the
footer - was being swallowed by it and never rendered. The comment
is gone and the page now shows four cards: Email, LinkedIn, GitHub
and CV.


UPDATING THE LIVE SITE
----------------------
See the instructions in the chat. In short: replace the files in
your armontajab.github.io folder with these, then in GitHub Desktop
write a summary, Commit to main, and Push origin.
