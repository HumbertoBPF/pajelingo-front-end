import AccountCard from "components/cards/AccountCard";
import CustomButton from "components/CustomButton";
import CustomSpinner from "components/CustomSpinner";
import FloatingLabelInput from "components/FloatingLabelInput";
import PaginationBar from "components/PaginationBar";
import { useCallback, useState } from "react";
import { Form } from "react-bootstrap";
import { baseUrl } from "services/base";

export default function SearchAccount() {
  const [searchPattern, setSearchPattern] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(undefined);

  const paginationCallback = useCallback(
    (page) => {
      setIsLoading(true);

      const queryParams = new URLSearchParams({
        q: searchPattern,
        page: page
      });

      fetch(`${baseUrl}/accounts?${queryParams}`)
        .then((response) => response.json())
        .then((data) => {
          setUsers({ ...data, page: page });
          setTimeout(() => setIsLoading(false), 2000);
        });
    },
    [searchPattern]
  );

  function renderAccounts() {
    if (users) {
      return (
        <>
          <div className="mt-4 text-center">
            {isLoading ? (
              <CustomSpinner />
            ) : (
              users.results.map((item) => (
                <AccountCard key={item.username} user={item} />
              ))
            )}
          </div>
          <PaginationBar
            previous={users.previous}
            next={users.next}
            count={users.count}
            resultsPerPage={10}
            page={users.page}
            callback={(page) => paginationCallback(page)}
          />
        </>
      );
    }

    return null;
  }

  return (
    <>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          setUsers(undefined);
          paginationCallback(1);
        }}>
        <FloatingLabelInput
          controlId="floatingSearchAccount"
          type="text"
          label="Search an account"
          placeholder="Search an account"
          onChange={(event) => setSearchPattern(event.target.value)}
        />
        <div className="text-center">
          <CustomButton variant="success" type="submit">
            Search account
          </CustomButton>
        </div>
      </Form>
      {renderAccounts()}
    </>
  );
}
