import React, { Component } from "react";
import * as THREE from 'three';
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import earth from './data/earth.jpg';
import a from "./data/users/07.gif";
import b from "./data/users/08.gif";
import c from "./data/users/29.jpg";
import d from "./data/users/35.gif";
import e from "./data/users/75.gif";
import './Components/Friends.css';
import './Components/Log.css';

const STAGE_SIZE = 240;
const PROGRAM_PANEL_Z = -120.25;
const PROGRAM_PANEL_WIDTH = 180;
const PROGRAM_PANEL_FONT_SIZE = 7;

class Three extends Component {
    componentDidMount() {
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.AmbientLight(0xffffff, 10));
        this.scene.add(new THREE.DirectionalLight(0xffffff, 100));
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

        this.webglRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.webglRenderer.setClearColor(0xffffff, 0);
        this.webglRenderer.setPixelRatio(window.devicePixelRatio || 1);

        this.cssRenderer = new CSS3DRenderer();
        this.cssRenderer.domElement.style.position = 'absolute';
        this.cssRenderer.domElement.style.top = '0';
        this.cssRenderer.domElement.style.left = '0';
        this.cssRenderer.domElement.style.pointerEvents = 'none';

        if (this.mount) {
            this.mount.style.width = `${STAGE_SIZE}px`;
            this.mount.style.height = `${STAGE_SIZE}px`;
            this.mount.style.maxWidth = `${STAGE_SIZE}px`;
            this.mount.style.maxHeight = `${STAGE_SIZE}px`;
            this.mount.style.overflow = 'hidden';
            this.mount.style.position = 'relative';
            this.mount.appendChild(this.webglRenderer.domElement);
            this.mount.appendChild(this.cssRenderer.domElement);
        }

        this.webglRenderer.domElement.style.position = 'absolute';
        this.webglRenderer.domElement.style.top = '0';
        this.webglRenderer.domElement.style.left = '0';
        this.webglRenderer.domElement.style.width = `${STAGE_SIZE}px`;
        this.webglRenderer.domElement.style.height = `${STAGE_SIZE}px`;
        this.webglRenderer.domElement.style.maxWidth = `${STAGE_SIZE}px`;
        this.webglRenderer.domElement.style.maxHeight = `${STAGE_SIZE}px`;
        this.webglRenderer.domElement.style.display = 'block';
        this.webglRenderer.domElement.style.pointerEvents = 'none';

        this.cssRenderer.domElement.style.width = `${STAGE_SIZE}px`;
        this.cssRenderer.domElement.style.height = `${STAGE_SIZE}px`;
        this.cssRenderer.domElement.style.maxWidth = `${STAGE_SIZE}px`;
        this.cssRenderer.domElement.style.maxHeight = `${STAGE_SIZE}px`;
        this.cssRenderer.domElement.style.display = 'block';

        this.texture = new THREE.TextureLoader().load(earth);
        this.geometry = new THREE.SphereGeometry(2.5, 24, 24);
        this.material = new THREE.MeshPhongMaterial({ map: this.texture });
        this.globe = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.globe);

        this.camera.position.z = 5;
        this.setFixedSize();
        this.syncProgramPanel();

        let frameId;

        const animate = () => {
            frameId = requestAnimationFrame(animate);

            if (this.globe && this.globe.visible) {
                this.globe.rotation.y -= 0.01;
            }

            this.webglRenderer.render(this.scene, this.camera);
            this.cssRenderer.render(this.scene, this.camera);
        };

        animate();

        this.cleanup = () => {
            cancelAnimationFrame(frameId);
            if (this.screenObject) {
                this.scene.remove(this.screenObject);
                this.screenObject = null;
            }
            if (this.mount) {
                if (this.webglRenderer.domElement && this.mount.contains(this.webglRenderer.domElement)) {
                    this.mount.removeChild(this.webglRenderer.domElement);
                }
                if (this.cssRenderer.domElement && this.mount.contains(this.cssRenderer.domElement)) {
                    this.mount.removeChild(this.cssRenderer.domElement);
                }
            }
            this.geometry.dispose();
            this.material.dispose();
            this.texture.dispose();
            this.webglRenderer.dispose();
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeProgram !== this.props.activeProgram || prevProps.messages !== this.props.messages) {
            this.syncProgramPanel();
        }
    }

    componentWillUnmount() {
        if (this.cleanup) {
            this.cleanup();
        }
    }

    setFixedSize() {
        if (!this.mount || !this.webglRenderer || !this.cssRenderer) {
            return;
        }

        this.webglRenderer.setSize(STAGE_SIZE, STAGE_SIZE, false);
        this.cssRenderer.setSize(STAGE_SIZE, STAGE_SIZE);
        this.camera.aspect = 1;
        this.camera.updateProjectionMatrix();
    }

    clearScreenPanel() {
        if (this.screenObject) {
            this.scene.remove(this.screenObject);
            this.screenObject = null;
        }
    }

    buildPanelShell(title) {
        const root = document.createElement('div');
        root.className = 'window programWindow';
        root.style.width = `${PROGRAM_PANEL_WIDTH}px`;
        root.style.fontSize = `${PROGRAM_PANEL_FONT_SIZE}px`;

        const titleBar = document.createElement('div');
        titleBar.className = 'title-bar';

        const titleText = document.createElement('div');
        titleText.className = 'title-bar-text';
        titleText.textContent = title;

        const controls = document.createElement('div');
        controls.className = 'title-bar-controls';

        const help = document.createElement('button');
        help.setAttribute('aria-label', 'Help');

        const close = document.createElement('button');
        close.setAttribute('aria-label', 'Close');
        close.addEventListener('click', () => {
            if (this.props.onCloseProgram) {
                this.props.onCloseProgram();
            }
        });

        controls.appendChild(help);
        controls.appendChild(close);
        titleBar.appendChild(titleText);
        titleBar.appendChild(controls);

        const body = document.createElement('div');
        body.className = 'window-body programBody';

        root.appendChild(titleBar);
        root.appendChild(body);
        return { root, body };
    }

    buildFriendsPanel() {
        const { root, body } = this.buildPanelShell('FriendScape');
        const paragraph = document.createElement('p');
        paragraph.textContent = 'all of your friends!!';
        body.appendChild(paragraph);

        const friendContainer = document.createElement('div');
        friendContainer.className = 'friendContainer';

        [a, b, c, d, e].forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.width = 30;
            img.alt = `friend-${index + 1}`;
            friendContainer.appendChild(img);
        });

        body.appendChild(friendContainer);
        return root;
    }

    buildLogPanel() {
        const { root, body } = this.buildPanelShell('Log');
        const logData = document.createElement('div');
        logData.id = 'logData';

        const messages = this.props.messages || [];
        messages.forEach((m, index) => {
            const line = document.createElement('div');
            const moodAt = typeof m.moodAt === 'number' ? m.moodAt : 50;
            let customClass = 'message';

            if (m.from === 'system') {
                customClass += ' system';
            } else if (m.from !== 'anon') {
                customClass += ' user';
            }

            if (moodAt < 0) customClass += ' mood-low';
            if (moodAt > 100) customClass += ' mood-high';

            line.className = customClass;

            const from = document.createElement('span');
            from.className = 'from';
            from.textContent = `${m.from}: `;

            const text = document.createElement('span');
            text.className = 'text';
            text.textContent = m.text;

            line.appendChild(from);
            line.appendChild(text);
            line.dataset.index = String(index);
            logData.appendChild(line);
        });

        body.appendChild(logData);
        return root;
    }

    buildPlaceholderPanel(title) {
        const { root, body } = this.buildPanelShell(title);
        const comingSoon = document.createElement('div');
        comingSoon.className = 'programComingSoon';
        comingSoon.textContent = 'coming soon';
        body.appendChild(comingSoon);
        return root;
    }

    syncProgramPanel() {
        this.clearScreenPanel();

        const program = this.props.activeProgram || 'globe';
        if (this.globe) {
            this.globe.visible = program === 'globe';
        }

        if (program === 'globe') {
            return;
        }

        let panelElement;
        if (program === 'friends') {
            panelElement = this.buildFriendsPanel();
        } else if (program === 'log') {
            panelElement = this.buildLogPanel();
        } else if (program === 'shop') {
            panelElement = this.buildPlaceholderPanel('Shop');
        } else if (program === 'messages') {
            panelElement = this.buildPlaceholderPanel('Messages');
        } else if (program === 'job') {
            panelElement = this.buildPlaceholderPanel('Job');
        } else {
            panelElement = this.buildPlaceholderPanel('Program');
        }

        const object = new CSS3DObject(panelElement);
        object.position.set(0, 0, PROGRAM_PANEL_Z);
        this.scene.add(object);
        this.screenObject = object;
    }

    render() {
        return (
            <div className="threeStage" ref={ref => (this.mount = ref)} style={{ width: `${STAGE_SIZE}px`, height: `${STAGE_SIZE}px`, maxWidth: `${STAGE_SIZE}px`, maxHeight: `${STAGE_SIZE}px` }} />
        );
    }
}

export default Three;