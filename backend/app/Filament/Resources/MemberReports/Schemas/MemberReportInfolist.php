<?php

namespace App\Filament\Resources\MemberReports\Schemas;

use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Infolists\Components\TextEntry;
use Filament\Support\Enums\FontWeight;
use Filament\Support\Enums\IconPosition;

class MemberReportInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                // ── MEMBER HEADER ────────────────────────────────────────
                Section::make()
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                TextEntry::make('fullname')
                                    ->label('Full Name')
                                    ->weight(FontWeight::Bold)
                                    ->size('xl')
                                    ->color('primary')
                                    ->columnSpan(2),

                                TextEntry::make('is_active')
                                    ->label('Status')
                                    ->badge()
                                    ->color(fn ($state) => $state ? 'success' : 'danger'),

                                TextEntry::make('user_id')
                                    ->label('User ID')
                                    ->icon('heroicon-m-identification')
                                    ->iconPosition(IconPosition::Before)
                                    ->badge()
                                    ->color('gray')
                                    ->copyable()
                                    ->copyMessage('User ID copied!')
                                    ->copyMessageDuration(1500),

                                TextEntry::make('sponsor.user_id')
                                    ->label('Sponsor ID')
                                    ->icon('heroicon-m-user-group')
                                    ->iconPosition(IconPosition::Before)
                                    ->badge()
                                    ->color('info')
                                    ->copyable()
                                    ->copyMessage('Sponsor ID copied!')
                                    ->copyMessageDuration(1500),

                                TextEntry::make('position')
                                    ->label('Position')
                                    ->icon('heroicon-m-briefcase')
                                    ->iconPosition(IconPosition::Before)
                                    ->badge()
                                    ->color('warning'),

                                TextEntry::make('package_step')
                                    ->label('Package')
                                    ->icon('heroicon-m-cube')
                                    ->iconPosition(IconPosition::Before)
                                    ->badge()
                                    ->color('primary'),

                                TextEntry::make('activation_date')
                                    ->label('Activation Date')
                                    ->icon('heroicon-m-calendar-days')
                                    ->iconPosition(IconPosition::Before)
                                    ->date('d M, Y'),

                                TextEntry::make('created_at')
                                    ->label('Joining Date')
                                    ->icon('heroicon-m-clock')
                                    ->iconPosition(IconPosition::Before)
                                    ->date('d M, Y'),

                                TextEntry::make('updated_at')
                                    ->label('Last Updated')
                                    ->icon('heroicon-m-arrow-path')
                                    ->iconPosition(IconPosition::Before)
                                    ->date('d M, Y'),

                                TextEntry::make('status')
                                    ->label('Account Status')
                                    ->icon('heroicon-m-shield-check')
                                    ->iconPosition(IconPosition::Before)
                                    ->badge()
                                    ->color('gray'),
                            ]),
                    ]),

                // ── PV / BV DATA ─────────────────────────────────────────
                Section::make('PV / BV Details')
                    ->description('Point value and business volume tracking for this member.')
                    ->icon('heroicon-m-chart-bar')
                    ->iconColor('primary')
                    ->collapsible()
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                TextEntry::make('pv')
                                    ->label('Personal PV')
                                    ->icon('heroicon-m-star')
                                    ->iconPosition(IconPosition::Before)
                                    ->weight(FontWeight::Bold)
                                    ->color('primary'),

                                TextEntry::make('builtup_left_pv')
                                    ->label('Built-up Left PV')
                                    ->icon('heroicon-m-arrow-left-circle')
                                    ->iconPosition(IconPosition::Before),

                                TextEntry::make('builtup_right_pv')
                                    ->label('Built-up Right PV')
                                    ->icon('heroicon-m-arrow-right-circle')
                                    ->iconPosition(IconPosition::Before),

                                TextEntry::make('total_left_bv')
                                    ->label('Total Left BV')
                                    ->icon('heroicon-m-arrow-left-circle')
                                    ->iconPosition(IconPosition::Before),

                                TextEntry::make('total_right_bv')
                                    ->label('Total Right BV')
                                    ->icon('heroicon-m-arrow-right-circle')
                                    ->iconPosition(IconPosition::Before),

                                TextEntry::make('carry_forward_left')
                                    ->label('Carry Forward Left')
                                    ->icon('heroicon-m-arrow-uturn-left')
                                    ->iconPosition(IconPosition::Before)
                                    ->color('warning'),

                                TextEntry::make('carry_forward_right')
                                    ->label('Carry Forward Right')
                                    ->icon('heroicon-m-arrow-uturn-right')
                                    ->iconPosition(IconPosition::Before)
                                    ->color('warning'),
                            ]),
                    ]),

                // ── PERSONAL DETAILS ─────────────────────────────────────
                Section::make('Personal Details')
                    ->description('Identity, contact and KYC information.')
                    ->icon('heroicon-m-user-circle')
                    ->iconColor('success')
                    ->collapsible()
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                TextEntry::make('dob')
                                    ->label('Date of Birth')
                                    ->icon('heroicon-m-cake')
                                    ->iconPosition(IconPosition::Before)
                                    ->date('d M, Y'),

                                TextEntry::make('gender')
                                    ->label('Gender')
                                    ->icon('heroicon-m-user')
                                    ->iconPosition(IconPosition::Before)
                                    ->badge()
                                    ->color('info'),

                                TextEntry::make('pan_number')
                                    ->label('PAN Number')
                                    ->icon('heroicon-m-finger-print')
                                    ->iconPosition(IconPosition::Before)
                                    ->copyable()
                                    ->copyMessage('PAN copied!')
                                    ->copyMessageDuration(1500),

                                TextEntry::make('mobile_no')
                                    ->label('Mobile Number')
                                    ->icon('heroicon-m-phone')
                                    ->iconPosition(IconPosition::Before)
                                    ->copyable()
                                    ->copyMessage('Number copied!')
                                    ->copyMessageDuration(1500),

                                TextEntry::make('email')
                                    ->label('Email Address')
                                    ->icon('heroicon-m-envelope')
                                    ->iconPosition(IconPosition::Before)
                                    ->copyable()
                                    ->copyMessage('Email copied!')
                                    ->copyMessageDuration(1500),
                            ]),
                    ]),

                // ── ADDRESS DETAILS ───────────────────────────────────────
                Section::make('Address Details')
                    ->description('Registered address of the member.')
                    ->icon('heroicon-m-map-pin')
                    ->iconColor('danger')
                    ->collapsible()
                    ->schema([
                        TextEntry::make('address')
                            ->label('Full Address')
                            ->icon('heroicon-m-home-modern')
                            ->iconPosition(IconPosition::Before)
                            ->columnSpanFull(),

                        Grid::make(4)
                            ->schema([
                                TextEntry::make('city')
                                    ->label('City')
                                    ->icon('heroicon-m-building-office')
                                    ->iconPosition(IconPosition::Before)
                                    ->weight(FontWeight::Medium),

                                TextEntry::make('district')
                                    ->label('District')
                                    ->icon('heroicon-m-map')
                                    ->iconPosition(IconPosition::Before)
                                    ->weight(FontWeight::Medium),

                                TextEntry::make('state')
                                    ->label('State')
                                    ->icon('heroicon-m-flag')
                                    ->iconPosition(IconPosition::Before)
                                    ->weight(FontWeight::Medium),

                                TextEntry::make('pin_code')
                                    ->label('Pin Code')
                                    ->icon('heroicon-m-hashtag')
                                    ->iconPosition(IconPosition::Before)
                                    ->badge()
                                    ->color('gray'),
                            ]),
                    ]),

                // ── SHIPPING DETAILS ──────────────────────────────────────
                Section::make('Shipping Details')
                    ->description('Delivery address for orders and shipments.')
                    ->icon('heroicon-m-truck')
                    ->iconColor('warning')
                    ->collapsible()
                    ->schema([
                        TextEntry::make('shipping_address')
                            ->label('Shipping Address')
                            ->icon('heroicon-m-home-modern')
                            ->iconPosition(IconPosition::Before)
                            ->columnSpanFull(),

                        Grid::make(4)
                            ->schema([
                                TextEntry::make('shipping_city')
                                    ->label('City')
                                    ->icon('heroicon-m-building-office')
                                    ->iconPosition(IconPosition::Before)
                                    ->weight(FontWeight::Medium),

                                TextEntry::make('shipping_district')
                                    ->label('District')
                                    ->icon('heroicon-m-map')
                                    ->iconPosition(IconPosition::Before)
                                    ->weight(FontWeight::Medium),

                                TextEntry::make('shipping_state')
                                    ->label('State')
                                    ->icon('heroicon-m-flag')
                                    ->iconPosition(IconPosition::Before)
                                    ->weight(FontWeight::Medium),

                                TextEntry::make('shipping_pin_code')
                                    ->label('Pin Code')
                                    ->icon('heroicon-m-hashtag')
                                    ->iconPosition(IconPosition::Before)
                                    ->badge()
                                    ->color('gray'),
                            ]),
                    ]),

                // ── NOMINEE DETAILS ───────────────────────────────────────
                Section::make('Nominee Details')
                    ->description('Nominated person details for this member account.')
                    ->icon('heroicon-m-user-plus')
                    ->iconColor('info')
                    ->collapsible()
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                TextEntry::make('nominee_name')
                                    ->label('Nominee Name')
                                    ->icon('heroicon-m-user')
                                    ->iconPosition(IconPosition::Before)
                                    ->weight(FontWeight::Bold),

                                TextEntry::make('nominee_relation')
                                    ->label('Relation')
                                    ->icon('heroicon-m-heart')
                                    ->iconPosition(IconPosition::Before)
                                    ->badge()
                                    ->color('info'),

                                TextEntry::make('nominee_mobile_no')
                                    ->label('Mobile Number')
                                    ->icon('heroicon-m-phone')
                                    ->iconPosition(IconPosition::Before)
                                    ->copyable()
                                    ->copyMessage('Number copied!')
                                    ->copyMessageDuration(1500),
                            ]),

                        TextEntry::make('nominee_address')
                            ->label('Nominee Address')
                            ->icon('heroicon-m-home-modern')
                            ->iconPosition(IconPosition::Before)
                            ->columnSpanFull(),

                        Grid::make(4)
                            ->schema([
                                TextEntry::make('nominee_city')
                                    ->label('City')
                                    ->icon('heroicon-m-building-office')
                                    ->iconPosition(IconPosition::Before)
                                    ->weight(FontWeight::Medium),

                                TextEntry::make('nominee_district')
                                    ->label('District')
                                    ->icon('heroicon-m-map')
                                    ->iconPosition(IconPosition::Before)
                                    ->weight(FontWeight::Medium),

                                TextEntry::make('nominee_state')
                                    ->label('State')
                                    ->icon('heroicon-m-flag')
                                    ->iconPosition(IconPosition::Before)
                                    ->weight(FontWeight::Medium),

                                TextEntry::make('nominee_pin_code')
                                    ->label('Pin Code')
                                    ->icon('heroicon-m-hashtag')
                                    ->iconPosition(IconPosition::Before)
                                    ->badge()
                                    ->color('gray'),
                            ]),
                    ]),

            ]);
    }
}