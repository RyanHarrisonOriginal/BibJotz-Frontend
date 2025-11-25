const BIBLE_VERSIONS = [
    { id: "ESV", name: "English Standard Version" },
    { id: "NIV", name: "New International Version" },
    { id: "KJV", name: "King James Version" },
    { id: "NKJV", name: "New King James Version" },
    { id: "NLT", name: "New Living Translation" },
    { id: "NASB", name: "New American Standard Bible" },
  ];
  
  const BOOKS = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
    "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
    "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
    "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
    "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
    "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
    "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
    "Zephaniah", "Haggai", "Zechariah", "Malachi",
    "Matthew", "Mark", "Luke", "John", "Acts", "Romans",
    "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
    "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
    "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews",
    "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
    "Jude", "Revelation"
  ];
  
  // Mock verse data
  const mockVerses = [
    { number: 1, text: "In the beginning God created the heavens and the earth." },
    { number: 2, text: "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters." },
    { number: 3, text: "And God said, 'Let there be light,' and there was light." },
    { number: 4, text: "God saw that the light was good, and he separated the light from the darkness." },
    { number: 5, text: "God called the light 'day,' and the darkness he called 'night.' And there was evening, and there was morning—the first day." },
  ];

  export { BIBLE_VERSIONS, BOOKS, mockVerses };