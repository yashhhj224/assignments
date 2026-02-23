
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  background: linear-gradient(135deg, #4338ca, #1e1b4b);
  color: white;
  padding: 80px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 60px;
`;

const LogoBox = styled.div`
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 10px;
`;

const BrandName = styled.h2`
  font-weight: 600;
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.1;
`;

const Description = styled.p`
  font-size: 18px;
  opacity: 0.85;
  max-width: 480px;
  margin-bottom: 40px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 18px;
  font-size: 16px;
`;

const AuthLeftPanel = () => {
  return (
    <Container>
      <Brand>
        <LogoBox />
        <BrandName>SocialGram</BrandName>
      </Brand>

      <Title>Connect through stories.</Title>

      <Description>
        Join a growing community. Share your ideas, connect with creators, and build your presence.
      </Description>

      <FeatureList>
        <FeatureItem>Unlimited posts</FeatureItem>
        <FeatureItem>Follow creators</FeatureItem>
        <FeatureItem>Build your digital presence</FeatureItem>
      </FeatureList>
    </Container>
  );
};

export default AuthLeftPanel;