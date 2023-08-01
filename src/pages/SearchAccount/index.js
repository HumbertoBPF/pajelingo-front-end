import { searchAccount } from "api/user";
import AccountCard from "components/cards/AccountCard";
import CustomButton from "components/CustomButton";
import CustomSpinner from "components/CustomSpinner";
import FloatingLabelInput from "components/FloatingLabelInput";
import PaginationBar from "components/PaginationBar";
import { useCallback, useState } from "react";
import { Form } from "react-bootstrap";

export default function SearchAccount() {
  const [searchPattern, setSearchPattern] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(undefined);

  const paginationCallback = useCallback(
    (page) => {
      setIsLoading(true);

      searchAccount({ q: searchPattern, page }, (data) => {
        setUsers({ ...data, page });
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
                <AccountCard
                  key={item.username}
                  user={item}
                  testId={`${item.username}-card`}
                />
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
          testId="search-input"
        />
        <div className="text-center">
          <CustomButton variant="success" type="submit" testId="submit-button">
            Search account
          </CustomButton>
        </div>
      </Form>
      {renderAccounts()}
    </>
  );
}
