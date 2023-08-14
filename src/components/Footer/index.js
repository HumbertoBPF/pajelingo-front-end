import LinkedInIcon from "components/icons/LinkedInIcon";
import styles from "./Footer.module.css";
import GitHubIcon from "components/icons/GitHubIcon";

export default function Footer() {
  return (
    <footer className={`mt-4 ${styles["custom-footer"]}`}>
      <section>
        <p data-testid="text-description">
          Author of this app and his other projects:
        </p>

        <div>
          <a
            href="https://www.linkedin.com/in/humberto-bpf"
            className="text-reset text-decoration-none"
            data-testid="linkedin-link">
            <LinkedInIcon /> <span>www.linkedin.com/in/humberto-bpf</span>
          </a>
          <br />
          <a
            href="https://github.com/HumbertoBPF"
            className="text-reset text-decoration-none"
            data-testid="github-link">
            <GitHubIcon /> <span>https://github.com/HumbertoBPF</span>
          </a>
        </div>
      </section>
    </footer>
  );
}
