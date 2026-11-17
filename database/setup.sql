CREATE TABLE IF NOT EXISTS meetings (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  meeting_type VARCHAR(20) NOT NULL
    CHECK (meeting_type IN ('testimony', 'regular', 'stake', 'general', 'special')),
  presiding VARCHAR(255) NOT NULL,
  conducting VARCHAR(255) NOT NULL,
  announcements TEXT[] DEFAULT '{}',
  opening_hymn JSONB NOT NULL,
  opening_prayer VARCHAR(255) NOT NULL,
  ward_business JSONB DEFAULT '[]',
  stake_business BOOLEAN DEFAULT false,
  sacrament_hymn JSONB NOT NULL,
  speakers JSONB DEFAULT '[]',
  closing_hymn JSONB NOT NULL,
  closing_prayer VARCHAR(255) NOT NULL
);

INSERT INTO meetings (
  date, meeting_type, presiding, conducting, announcements,
  opening_hymn, opening_prayer, ward_business, stake_business,
  sacrament_hymn, speakers, closing_hymn, closing_prayer
)
VALUES
(
  '2026-12-06', 'regular', 'Bishop Smith', 'Brother Jones',
  ARRAY['Ward temple visit on December 13'],
  '{"number":2,"title":"The Spirit of God"}', 'Sister Williams',
  '[{"description":"Sustaining of new Primary president"}]', false,
  '{"number":169,"title":"As Now We Take the Sacrament"}',
  '[{"name":"Sister Brown","topic":"Faith in Jesus Christ","type":"speaker"}]',
  '{"number":31,"title":"O God, Our Help in Ages Past"}', 'Brother Davis'
),
(
  '2026-12-13', 'testimony', 'Bishop Smith', 'Brother Jones',
  ARRAY['Christmas activity after church'],
  '{"number":19,"title":"We Thank Thee, O God, for a Prophet"}', 'Sister Adams',
  '[]', false,
  '{"number":193,"title":"I Stand All Amazed"}',
  '[{"name":"Ward Members","topic":"Personal testimonies","type":"speaker"}]',
  '{"number":85,"title":"How Firm a Foundation"}', 'Brother James'
),
(
  '2026-12-20', 'stake', 'Stake President Brown', 'Brother White',
  ARRAY['Stake leadership meeting at 2 PM'],
  '{"number":27,"title":"Praise to the Man"}', 'Brother Thomas',
  '[]', true,
  '{"number":172,"title":"In Humility, Our Savior"}',
  '[{"name":"Elder Johnson","topic":"Strengthening Families","type":"speaker"}]',
  '{"number":134,"title":"I Believe in Christ"}', 'Sister Thomas'
),
(
  '2026-12-27', 'general', 'Stake President Brown', 'Brother White',
  ARRAY['End-of-year ward gathering'],
  '{"number":1,"title":"The Morning Breaks"}', 'Sister Adams',
  '[]', true,
  '{"number":175,"title":"O God, the Eternal Father"}',
  '[{"name":"Elder Anderson","topic":"Following Jesus Christ","type":"speaker"}]',
  '{"number":30,"title":"Come, Come, Ye Saints"}', 'Brother Williams'
),
(
  '2027-01-03', 'special', 'Bishop Johnson', 'Brother Williams',
  ARRAY['New year ward announcements'],
  '{"number":2,"title":"The Spirit of God"}', 'Sister Adams',
  '[]', false,
  '{"number":175,"title":"O God, the Eternal Father"}',
  '[{"name":"Brother Anderson","topic":"New Beginnings","type":"speaker"}]',
  '{"number":30,"title":"Come, Come, Ye Saints"}', 'Brother Brown'
),
(
  '2027-01-10', 'regular', 'Bishop Johnson', 'Brother Williams',
  ARRAY['Youth activity on Saturday'],
  '{"number":3,"title":"Now Let Us Rejoice"}', 'Brother Green',
  '[{"description":"Ward conference announcement"}]', false,
  '{"number":181,"title":"Jesus of Nazareth, Savior and King"}',
  '[{"name":"Sister Miller","topic":"Prayer","type":"speaker"}]',
  '{"number":96,"title":"Dearest Children, God Is Near You"}', 'Sister Clark'
),
(
  '2027-01-17', 'testimony', 'Bishop Smith', 'Brother Jones',
  ARRAY['Ward service project announcement'],
  '{"number":19,"title":"We Thank Thee, O God, for a Prophet"}', 'Sister Adams',
  '[]', false,
  '{"number":193,"title":"I Stand All Amazed"}',
  '[{"name":"Brother James","topic":"Gratitude","type":"speaker"}]',
  '{"number":85,"title":"How Firm a Foundation"}', 'Sister Adams'
),
(
  '2027-01-24', 'regular', 'Bishop Johnson', 'Brother White',
  ARRAY['Upcoming ward activities'],
  '{"number":2,"title":"The Spirit of God"}', 'Brother Green',
  '[]', false,
  '{"number":169,"title":"As Now We Take the Sacrament"}',
  '[{"name":"Sister Brown","topic":"Serving Others","type":"speaker"}]',
  '{"number":31,"title":"O God, Our Help in Ages Past"}', 'Brother Davis'
)
ON CONFLICT (date) DO NOTHING;
