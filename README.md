# Dual Clock

A JavaScript app for [BUSY Bar](https://busy.bar) that shows local time and UTC on the front display, one line each, updating every second.

Local time uses the time zone set on the BUSY Bar (the same approach as the official [Clock](https://github.com/busy-app/clock-app) app). UTC is taken from the same `Date` instant with the standard UTC accessors.

Press **Back** once (short press) to quit. A long press of Back also force-quits, which the firmware handles outside the app. Requires firmware 1.3.1 or later.

## File layout

A clone of this repository has the app sources at the repository root:

```text
./
├── appmeta/
│   └── manifest.json    # id, name, version, API version
├── scripts/
│   └── main.js          # entry point the BUSY Bar starts
├── LICENSE
├── README.md
└── .gitignore
```

The app id is `app.user.dualclock`. Optional icons (`appmeta/icon_front_8x8.png`, 8×8 color PNG, and `appmeta/icon_back_11x11.png`, 11×11 grayscale PNG) are not included; the firmware uses a default icon if they are omitted.

To install from a `.tgz`, the archive must have a folder named after the app id at its root:

```text
app.user.dualclock/
├── appmeta/manifest.json
└── scripts/main.js
```

## Install and run

Firmware 1.3.1 or later is required for JS apps. Connect the BUSY Bar over USB and open [http://10.0.4.20](http://10.0.4.20) to confirm the local web interface loads.

### Pack a `.tgz`

The archive must have a folder named `app.user.dualclock` at its root, containing `appmeta/` and `scripts/` (see the official [clock-app](https://github.com/busy-app/clock-app) package layout). From the root of a clone:

```sh
mkdir -p /tmp/app.user.dualclock
cp -R appmeta scripts /tmp/app.user.dualclock/
tar -C /tmp -czf app.user.dualclock.tgz app.user.dualclock
```

If you rename the clone folder to `app.user.dualclock`, you can pack it from the parent directory instead:

```sh
tar -czf app.user.dualclock.tgz \
  --exclude=.git --exclude=README.md --exclude=LICENSE --exclude=.gitignore \
  app.user.dualclock
```

### Install from the web interface

1. Connect BUSY Bar to a computer via USB.
2. Open [http://10.0.4.20](http://10.0.4.20) in a browser.
3. Go to the **Apps** tab and click **Add app**.
4. Select `app.user.dualclock.tgz` and click **Upload**, then **Install app** (or **Update app** if it is already installed).
5. Start the app from **Apps** on the device (mode selector → Apps → Dual Clock → Start) or with **Start** on the Apps tab in the web interface.

Details: [JS apps](https://docs.busy.app/bar/dev/js-apps) and [Manage apps on BUSY Bar](https://docs.busy.app/bar/apps-and-integrations).

### Quit

- Short-press **Back** to close the app.
- Long-press **Back** to force-quit.
- Or click **Stop** in the web interface Apps tab.

## Screenshot

Add a photo or capture of the front display here, for example `screenshots/front.png`, once you have run the app on a BUSY Bar.

## License

MIT. Copyright (c) 2026 Connor Haft. This is the suggested default for a public repository; change the license if you want something else.
