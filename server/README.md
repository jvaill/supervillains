Super Supervillains Inc.
========================

Super Supervillains Inc. is an organization comprised of the world's most
talented and elite supervillains. Due to the nature of its members, its
corporate hierarchy has been changing and evolving at unprecedented rates.
Coups and overthrow attempts have become the daily norm, and shareholders have
become nervous.

To help quantify the magnitude of the problem and to give some visibility to
shareholders, you have been tasked with developing a React frontend to display
Super Supervillains Inc.'s corporate structure. Luckily, Super Supervillains
Inc. already exposes their corporate hierarchy via an API.

To setup the backing API run `npm install`, then run `npm start` to start it.

**Note that the API generates a new random hierarchy of villains each time it's
started!**

## Methods

### `GET /villain-hierarchy/`
Returns Super Supervillains Inc.'s current head honchos.
```
[
  {
    id: 0,
    name: "Solaris"
  },
  {
    id: 46,
    name: "Emma Frost"
  }
]
```

### `GET /villain-hierarchy/:id`
Returns Super Supervillains Inc.'s members that report to a member with a given
id.
```
[
  {
    id: 47,
    name: "Solomon Grundy"
  },
  {
    id: 64,
    name: "Black Knight"
  },
  {
    id: 79,
    name: "Diablo"
  }
]
```

## What's in a solution?
Some of the things we'd like to see in your solution:
- You should use React. Feel free to include other libraries as you see fit.
- There should be a way for the user to drill into a member's reports. It
  follows that API calls should only be made when needed.
- *Bonus:* Slick design tends to win some of our hearts over!
- *Bonus:* Tests!

We don't provide any frontend boilerplate out of the box. Feel free to setup
your frontend however you'd like; use your imagination. If your solution is
entirely static, you may serve your files from `public`.

Good luck!
